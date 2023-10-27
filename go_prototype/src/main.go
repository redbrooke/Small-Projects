package main

import (
	"fmt"
	"log"
	"os/exec"
)

type returnedInstruction struct {
	command string
	success bool
	err     error
	output  string
}

func (command *returnedInstruction) execute() ([]byte, error) {
	fmt.Println("Running")
	cmd := exec.Command("powershell", "-nologo", "-noprofile", "-command", command.command)

	fmt.Println("pipe open")

	out, err := cmd.CombinedOutput()
	fmt.Println(out)
	fmt.Println(command.command)
	fmt.Println("Command run")
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%s\n", out)
	return out, err
}

func (command *returnedInstruction) setCommand(nextInstruction string) {
	fmt.Println(nextInstruction)
	fmt.Println("^ I set the command to this")
	command.command = nextInstruction
	fmt.Println(command.command)
}

func main() {
	var exampleCommand string = "whoami"
	var instruction returnedInstruction
	instruction.setCommand(exampleCommand)
	var out []byte
	var err error
	out, err = instruction.execute()
	fmt.Println("hello")
	fmt.Println(out)
	fmt.Println(err)
}
