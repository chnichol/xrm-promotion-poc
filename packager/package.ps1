Install-Module Microsoft.Xrm.Data.PowerShell -Scope CurrentUser -Force

Set-Location packager
$solpath = '..\solution_components'

Import-Module ./Microsoft.Federal.PowerApps.SolutionBuilder.dll
$xml = Resolve-SolutionGenerator $solpath

New-Item -Path "../changes/other" -Name "solution.xml" -ItemType File -Force -Value $xml
./SolutionPackager.exe /action:Pack /zipfile:import.zip /folder:"..\changes"

$currentLocation = Get-Location
$solutionFileName = 'import.zip'

Import-CrmSolution -conn $env:CRM_CONN -SolutionFilePath "$currentLocation\$solutionFileName" -PublishChanges -ActivatePlugIns -SkipDependancyOnProductUpdateCheckOnInstall

$data = Get-Content data.JSON | ConvertFrom-Json
foreach($entity in $data){
    $entity.data | ForEach-Object {
        $_.psobject.properties | ForEach-Object {
            $datahash = @{}
            $datahash[$_.Name] = $_.Value
            New-CrmRecord -conn $env:CRM_CONN -EntityLogicalName $entity.entitylogicalname -Fields $datahash
        }
    }
}

Expand-Archive -Path import.Zip -DestinationPath ../artifacts/solution