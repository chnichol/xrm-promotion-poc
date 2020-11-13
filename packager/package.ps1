Install-Module Microsoft.Xrm.Data.PowerShell -Scope CurrentUser -Force

Set-Location packager
$solpath = '..\solution_components'

Import-Module ./Microsoft.Federal.PowerApps.SolutionBuilder.dll
$xml = Resolve-SolutionGenerator $solpath

New-Item -Path "../solution_components/other" -Name "solution.xml" -ItemType File -Force -Value $xml
./SolutionPackager.exe /action:Pack /zipfile:import.zip /folder:"..\solution_components"

$currentLocation = Get-Location
$solutionFileName = 'import.zip'

Import-CrmSolution -conn $env:CRM_CONN -SolutionFilePath "$currentLocation\$solutionFileName" -PublishChanges -ActivatePlugIns -SkipDependancyOnProductUpdateCheckOnInstall

Expand-Archive -Path import.Zip -DestinationPath ../artifacts/