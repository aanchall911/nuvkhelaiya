# Builds web-ready committee photos and a TypeScript manifest.
#
#   <Person Name>.jpg / .CR3   -> name-<person-name>.jpg   (labelled portrait)
#   team / Team / group / trio / duo / <folder>  -> group-NN.jpg
#   IMG_1234 / VID-... / anything else           -> p-NN.jpg (unlabelled)
#
# Handles Canon CR3 RAW by extracting the largest embedded JPEG preview,
# and applies EXIF orientation so portraits are never sideways.
param(
  # EXIF orientation assumed for CR3 previews, which carry no tag themselves.
  # 8 = camera rotated 90 deg CCW (matches every JPEG in this shoot).
  [int]$RawOrientation = 8
)
Add-Type -AssemblyName System.Drawing

$root = Resolve-Path (Join-Path $PSScriptRoot '..')
$LATIN = [System.Text.Encoding]::GetEncoding(28591)
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 82L)
$MAX = 1100

function Get-EmbeddedJpeg([string]$path) {
  $bytes = [System.IO.File]::ReadAllBytes($path)
  $s = $LATIN.GetString($bytes)
  $soi = [string]([char]0xFF) + [char]0xD8 + [char]0xFF
  $eoi = [string]([char]0xFF) + [char]0xD9
  $best = -1; $bestLen = 0; $pos = 0
  while ($true) {
    $i = $s.IndexOf($soi, $pos); if ($i -lt 0) { break }
    $j = $s.IndexOf($eoi, $i + 2); if ($j -lt 0) { break }
    $len = $j + 2 - $i
    if ($len -gt $bestLen) { $bestLen = $len; $best = $i }
    $pos = $j + 2
  }
  if ($best -lt 0) { return $null }
  return , $bytes[$best..($best + $bestLen - 1)]
}

function To-Kebab([string]$s) {
  $s = $s -replace '[^A-Za-z ]', ' '
  $s = ($s -replace '\s+', ' ').Trim()
  return ($s.ToLower() -replace ' ', '-')
}

# folder -> [slug, role]
$map = [ordered]@{
  'Presidents'        = @('presidents', 'Presidents')
  'Treasurers'        = @('treasurers', 'Treasurers')
  'Cultural team'     = @('cultural', 'Cultural')
  'Marketing'         = @('marketing', 'Marketing')
  'Content team'      = @('content', 'Content')
  'Decoration team'   = @('decoration', 'Decoration')
  'Social Media Team' = @('social-media', 'Social Media')
  'Technical'         = @('technical', 'Technical')
  'Esports'           = @('esports', 'E-Sports')
  'Outreach team'     = @('outreach', 'Outreach')
  'Media team'        = @('media', 'Media')
}

# words that mean "this is the whole team", not a person
$groupWords = '^(team|teams|group|trio|duo|all|presidents|treasurers|everyone)$'

$manifest = [ordered]@{}

foreach ($key in $map.Keys) {
  $slug = $map[$key][0]
  $role = $map[$key][1]
  $srcDir = Join-Path $root $key
  if (-not (Test-Path $srcDir)) { Write-Host "no folder: $key"; continue }

  $outDir = Join-Path $root "public\assets\team\$slug"
  if (Test-Path $outDir) { Remove-Item (Join-Path $outDir '*') -Force -ErrorAction SilentlyContinue }
  New-Item -ItemType Directory -Force -Path $outDir | Out-Null

  $entries = @()
  $gi = 1; $pi = 1

  foreach ($f in (Get-ChildItem $srcDir -File | Where-Object { $_.Extension -match '(?i)\.(jpe?g|png|cr3)$' } | Sort-Object Name)) {
    $base = [IO.Path]::GetFileNameWithoutExtension($f.Name).Trim()

    $isGroup = $false
    $person = $null
    if ($base -match $groupWords) { $isGroup = $true }
    elseif ($base -match '(?i)(trio|duo|_team|group)$') { $isGroup = $true }
    elseif ($base -match '(?i)^(IMG|VID|DSC|PXL)[-_ ]') { }           # unnamed camera file
    elseif ($base -match '^[A-Za-z][A-Za-z ]{2,}$') { $person = $base } # looks like a person name

    # ---- decode pixels ----
    $srcPath = $f.FullName
    $temp = $null
    if ($f.Extension -match '(?i)cr3') {
      $jb = Get-EmbeddedJpeg $f.FullName
      if ($null -eq $jb) { Write-Host "  skip (no preview): $($f.Name)"; continue }
      $temp = Join-Path $env:TEMP ("nk_" + [guid]::NewGuid().ToString('N') + ".jpg")
      [System.IO.File]::WriteAllBytes($temp, $jb)
      $srcPath = $temp
    }

    try { $img = [System.Drawing.Image]::FromFile($srcPath) }
    catch { Write-Host "  fail: $($f.Name)"; if ($temp) { Remove-Item $temp -Force -EA 0 }; continue }

    $ori = 1
    if ($img.PropertyIdList -contains 274) { $ori = $img.GetPropertyItem(274).Value[0] }
    # A CR3's embedded preview carries no orientation tag of its own, so it comes
    # out in raw sensor landscape. Every JPEG from this shoot reports 8, so treat
    # unmarked RAW previews the same way. Override with -RawOrientation if a
    # future shoot was held the other way round.
    if ($temp -and $ori -eq 1) { $ori = $RawOrientation }
    switch ($ori) {
      3 { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate180FlipNone) }
      6 { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate90FlipNone) }
      8 { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate270FlipNone) }
    }

    $r = [Math]::Min($MAX / $img.Width, $MAX / $img.Height)
    if ($r -gt 1) { $r = 1 }
    $w = [int]($img.Width * $r); $h = [int]($img.Height * $r)
    $bmp = New-Object System.Drawing.Bitmap($w, $h)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.DrawImage($img, 0, 0, $w, $h)
    $g.Dispose(); $img.Dispose()
    if ($temp) { Remove-Item $temp -Force -EA 0 }

    if ($isGroup) { $name = "group-{0:d2}.jpg" -f $gi; $gi++ }
    elseif ($person) { $name = "name-" + (To-Kebab $person) + ".jpg" }
    else { $name = "p-{0:d2}.jpg" -f $pi; $pi++ }

    $bmp.Save((Join-Path $outDir $name), $codec, $ep)
    $bmp.Dispose()
    $entries += $name
    Write-Host "  $slug/$name  ${w}x${h}"
  }

  # drop byte-identical duplicates
  $seen = @{}
  foreach ($file in (Get-ChildItem $outDir -Filter *.jpg | Sort-Object Name)) {
    $h = (Get-FileHash $file.FullName -Algorithm MD5).Hash
    if ($seen.ContainsKey($h)) {
      Remove-Item $file.FullName -Force
      $entries = $entries | Where-Object { $_ -ne $file.Name }
      Write-Host "  dedup: $($file.Name)"
    }
    else { $seen[$h] = 1 }
  }

  $manifest[$slug] = @{ role = $role; files = @($entries | Sort-Object) }
}

# ---- emit the TypeScript manifest ----
$sb = New-Object System.Text.StringBuilder
[void]$sb.AppendLine('/**')
[void]$sb.AppendLine(' * GENERATED by tools/build-team-photos.ps1 — do not edit by hand.')
[void]$sb.AppendLine(' * Re-run the script after adding or renaming committee photographs.')
[void]$sb.AppendLine(' */')
[void]$sb.AppendLine('')
[void]$sb.AppendLine('export type TeamFolder = { slug: string; role: string; files: string[] };')
[void]$sb.AppendLine('')
[void]$sb.AppendLine('export const TEAM_FOLDERS: TeamFolder[] = [')
foreach ($slug in $manifest.Keys) {
  $role = $manifest[$slug].role
  $files = ($manifest[$slug].files | ForEach-Object { "'" + $_ + "'" }) -join ', '
  [void]$sb.AppendLine("  { slug: '$slug', role: '$role', files: [$files] },")
}
[void]$sb.AppendLine('];')
$outFile = Join-Path $root 'src\data\teamManifest.ts'
[System.IO.File]::WriteAllText($outFile, $sb.ToString(), (New-Object System.Text.UTF8Encoding($false)))
Write-Host "wrote $outFile"
Write-Host "done"
