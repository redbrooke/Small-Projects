package main

import (
	"embed"
	"fmt"
	"os/exec"
	"strings"
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
		command.success = false
	} else {
		command.success = true
	}
	fmt.Printf("%s\n", out)
	command.output = string(out)
	command.err = err
	return out, err
}

func (command *returnedInstruction) setCommand(nextInstruction string) {
	fmt.Println(nextInstruction)
	fmt.Println("^ I set the command to this")
	command.command = nextInstruction
	fmt.Println(command.command)
}

//go:embed commands.txt
var commands embed.FS

func main() {
	data, _ := commands.ReadFile("commands.txt")
	commandSlice := strings.Split(string(data), "\n")
	var out []byte
	var err error

	var results = make([]returnedInstruction, len(commandSlice))
	for i := 0; i < len(commandSlice); i++ {
		fmt.Println("----------------------------------")
		var currentCommand = new(returnedInstruction)
		currentCommand.setCommand(commandSlice[i])
		out, err = currentCommand.execute()
		results[i] = *currentCommand
	}

	fmt.Println(out)
	fmt.Println(err)
	fmt.Println(results[0].output)

}
