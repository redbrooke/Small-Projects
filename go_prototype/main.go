package main

import {
  instruction "returnedInstruction"
}

func main() {
  string exampleCommand = "whoami";
  instruction.setCommand(exampleCommand);
  out, err = instruction.execute();
}

