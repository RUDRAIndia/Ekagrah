Add-Type -AssemblyName System.Drawing

function Make-Icon($filename, $size, $colorHex) {
    $bmp = New-Object System.Drawing.Bitmap $size, $size
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    
    # Background transparent
    $g.Clear([System.Drawing.Color]::Transparent)
    
    # Draw circle
    $rect = New-Object System.Drawing.Rectangle 0, 0, $size, $size
    $color = [System.Drawing.ColorTranslator]::FromHtml($colorHex)
    $brush = New-Object System.Drawing.SolidBrush $color
    $g.FillEllipse($brush, $rect)
    
    # Inner circle for design (like an eye)
    $innerColor = [System.Drawing.ColorTranslator]::FromHtml("#ffffff")
    $innerBrush = New-Object System.Drawing.SolidBrush $innerColor
    $innerOffset = [Math]::Floor($size * 0.25)
    $innerSize = [Math]::Floor($size * 0.5)
    $innerRect = New-Object System.Drawing.Rectangle $innerOffset, $innerOffset, $innerSize, $innerSize
    $g.FillEllipse($innerBrush, $innerRect)
    
    $bmp.Save($filename, [System.Drawing.Imaging.ImageFormat]::Png)
    
    $brush.Dispose()
    $innerBrush.Dispose()
    $g.Dispose()
    $bmp.Dispose()
}

$baseDir = "c:\Users\rajru\Desktop\Exten_Create\Ekagrah\icons"

Make-Icon "$baseDir\icon16.png" 16 "#2ecc71"
Make-Icon "$baseDir\icon48.png" 48 "#2ecc71"
Make-Icon "$baseDir\icon128.png" 128 "#2ecc71"

Make-Icon "$baseDir\icon16_red.png" 16 "#e74c3c"
Make-Icon "$baseDir\icon48_red.png" 48 "#e74c3c"
Make-Icon "$baseDir\icon128_red.png" 128 "#e74c3c"

Write-Host "Icons generated successfully."
