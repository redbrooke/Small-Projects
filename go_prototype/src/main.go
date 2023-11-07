package main

import (
	"embed"
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

//go:embed commands.txt
var commands embed.FS

func main() {

	data, _ := commands.ReadFile("commands.txt")
	fmt.Println(string(data))
	fmt.Println("^ this was in the text file.")

	// var lines = make(string[],10,0); // CHANGE 10 TO LENGTH OF FILE

	// var results = make(returnedInstruction[]);
	// for (i :=0; i < len(lines); i++){
	// results[i] = new returnedInstruction;
	// results[i].setCommand();
	//
	// }

	//var exampleCommand = "whoami" //=string(data); // whoami
	var exampleCommand = string(data)
	var instruction returnedInstruction
	instruction.setCommand(exampleCommand)
	var out []byte
	var err error
	out, err = instruction.execute()
	fmt.Println("hello")
	fmt.Println(out)
	fmt.Println(err)
}
