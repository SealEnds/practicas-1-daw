# 17/03/2023

#Crear un programa gráfico de nombre login que es una pantalla de entrada a una aplicación, de forma que disponga de un cuadro de texto (TextBox) grande, 
#y se deba de pulsar 10 botones, del 0 al 9, para escribir la contraseña de entrada, que será 88972. 
#Esta contraseña se irá escribiendo en el TextBox a medida que se pulsan los botones.
#Se deberá de colocar un botón para borrar el contenido del TextBox y otro para validarlo.
#Si la contraseña es correcta, se termina el programa.
#Si no es correcta, limpia el TextBox, se avisa que la contraseña no es válida y vuelve a empezar.
#Asegúrate que la pantalla es lo más bonita posible y que no se parezca en nada a la que tienen tus compañeros.
#Todo aquello que libremente quieras añadir como expresión de tu arte, puedes hacerlo.

Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

$password04 = "8 | 8 | 9 | 7 | 2 |"

#Pantalla
$Pantalla04 = New-Object System.Windows.Forms.Form 
$Pantalla04.text = 'login'
$Pantalla04.size = New-Object System.Drawing.Size(1400, 800)
$Pantalla04.StartPosition = 'CenterScreen'
$Pantalla04.FormBorderStyle = 'none'
$Pantalla04.BackColor = "black"
#https://learn.microsoft.com/en-us/powershell/scripting/learn/ps101/09-functions?view=powershell-7.3
Function AddButton04 {
    param(
        [string]$texto,
        [int]$mtop,
        [int]$mizq,
        [int]$alto,
        [int]$ancho,
        [int]$font,
        [string]$backcolor
    )
   
    $btn04 = New-Object System.Windows.Forms.Button
    $btn04.Text = $texto
    $btn04.Size = New-Object System.Drawing.Size($ancho, $alto)
    $btn04.Location = New-Object System.Drawing.Point($mizq, $mtop)
    $btn04.Font = New-Object System.Drawing.Font('Arial',$font)
    $btn04.BackColor = $backcolor

    $Pantalla04.Controls.Add($btn04)
        
    switch -CaseSensitive ($texto){
        'X' { $btn04.Add_Click({ $Pantalla04.Close() }) }
         '0' { $btn04.Add_Click({ IntroducirNumero04 -teclaEscrita 0 }) }
         '1' { $btn04.Add_Click({ IntroducirNumero04 -teclaEscrita 1 }) }
         '2' { $btn04.Add_Click({ IntroducirNumero04 -teclaEscrita 2 }) }
         '3' { $btn04.Add_Click({ IntroducirNumero04 -teclaEscrita 3 }) }
         '4' { $btn04.Add_Click({ IntroducirNumero04 -teclaEscrita 4 }) }
         '5' { $btn04.Add_Click({ IntroducirNumero04 -teclaEscrita 5 }) }
         '6' { $btn04.Add_Click({ IntroducirNumero04 -teclaEscrita 6 }) }
         '7' { $btn04.Add_Click({ IntroducirNumero04 -teclaEscrita 7 }) }
         '8' { $btn04.Add_Click({ IntroducirNumero04 -teclaEscrita 8 }) }
         '9' { $btn04.Add_Click({ IntroducirNumero04 -teclaEscrita 9 }) }
         'Entrar' { $btn04.Add_Click({ ComprobarPassword }) }
         'x' { $btn04.Add_Click({ VaciarTextBox }) }
     }

}

AddButton04 -texto "X" -mtop -3 -mizq 1343 -alto 60 -ancho 60 -font 20 -backcolor "coral"

ForEach($tecla in 0..9) { 
    
    switch ($tecla){
        {$tecla -eq 0 } { $fila04 = 0 }
        {$tecla -ge 1 -and $tecla -lt 4} { $fila04 = 1 }
        {$tecla -ge 4 -and $tecla -lt 7} { $fila04 = 2 }
        {$tecla -ge 7 -and $tecla -lt 9} { $fila04 = 3 }
    
        {$tecla -eq 1 -or $tecla -eq 4 -or $tecla -eq 7} { $margenizq04 = 000 }
        {$tecla -eq 2 -or $tecla -eq 5 -or $tecla -eq 8 -or $tecla -eq 0} { $margenizq04 = 100 }
        {$tecla -eq 3 -or $tecla -eq 6 -or $tecla -eq 9} { $margenizq04 = 200 }

    }
    AddButton04 -texto "$tecla" -mtop (100+100*$fila04) -mizq (600+$margenizq04) -alto 60 -ancho 60 -font 20 -backcolor "white"

}

$TextBox04 = New-Object System.Windows.Forms.TextBox
$TextBox04.Location = New-Object System.Drawing.Point(630, 500)
$TextBox04.Size = New-Object System.Drawing.Size(200,220)
$TextBox04.Font = New-Object System.Drawing.Font('Arial', 18)

$Pantalla04.Controls.Add($TextBox04)

Function IntroducirNumero04 {
     param(
        [int]$teclaEscrita
    )
    
    $TextBox04.Text += " $teclaEscrita |"
}

AddButton04 -texto "Entrar" -mtop 550 -mizq 600 -alto 60 -ancho 260 -font 20 -backcolor "gold"
AddButton04 -texto "x" -mtop 498 -mizq 850 -alto 38 -ancho 38 -font 15 -backcolor "coral"

Function ComprobarPassword {
    #https://www.educba.com/powershell-split-string/
    $passwordIntroducida = $TextBox04.Text.Trim()
    if ($passwordIntroducida -eq $password04) {
        label04 -texto "Correcto" -backcolor "Gold"
        $Pantalla04.Close() 
    } else {
        label04 -texto "Error" -backcolor "coral"
        VaciarTextBox
    }

}

Function label04 {
    param(
        [string]$texto,
        [string]$backcolor
    )
    $label04 = New-Object System.Windows.Forms.Label
    $label04.Size = New-Object System.Drawing.Size(100, 30)
    $label04.Font = New-Object System.Drawing.Font('Arial',15)
    $label04.Text = $texto
    $label04.BackColor = $backcolor
    $label04.Location = New-Object System.Drawing.Point(685,640)
    $Pantalla04.Controls.Add($label04)
    $label04.BringToFront()

}

Function VaciarTextBox {
    $TextBox04.Text = ''
}

$Pantalla04.ShowDialog()