package main

import (
   "fmt"
   "log"
   "os/exec"
)

/**

package main

import (
   "fmt"
   "log"
   "os/exec"
)

func main() {
   cmd := exec.Command("powershell", "-nologo", "-noprofile")
   stdin, err := cmd.StdinPipe()
   if err != nil {
      log.Fatal(err)
   }
   go func() {
      defer stdin.Close()
      fmt.Fprintln(stdin, "New-Item a.txt")
      fmt.Fprintln(stdin, "New-Item b.txt")
   }()
   out, err := cmd.CombinedOutput()
   if err != nil {
      log.Fatal(err)
   }
   fmt.Printf("%s\n", out)
}

**/