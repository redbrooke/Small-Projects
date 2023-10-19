package main

func main() {
	var exampleCommand := "whoami"
	instruction.setCommand(exampleCommand)
	out, err = instruction.execute()
	fmt.println("hello")
}
