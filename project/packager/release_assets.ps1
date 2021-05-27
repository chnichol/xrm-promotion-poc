Install-Module Microsoft.Xrm.Data.PowerShell -Scope CurrentUser -Force

Set-Location packager
$solpath = '..\changes'

Import-Module ./Microsoft.Federal.PowerApps.SolutionBuilder.dll
$xml = Invoke-SolutionGenerator $solpath

New-Item -Path "../changes/other" -Name "solution.xml" -ItemType File -Force -Value $xml
./SolutionPackager.exe /action:Pack /zipfile:import.zip /folder:"..\changes"
