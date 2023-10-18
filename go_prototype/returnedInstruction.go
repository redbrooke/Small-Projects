import (
   "fmt"
   "log"
   "os/exec"
)

type returnedInstruction struct {
  command string
  success bool
  err error
  output string
}

func (command returnedInstruction) execute() string,int {
	cmd := exec.Command()
  cmd := exec.Command("powershell", "-nologo", "-noprofile")
  stdin, err := cmd.StdinPipe()
  if err != nil {
      log.Fatal(err)
  }    
  defer stdin.Close()
  fmt.Fprintln(stdin, command.command)
  out, err := cmd.CombinedOutput()
  if err != nil {
      log.Fatal(err)
  }
  fmt.Printf("%s\n", out)
  return out, err
}
