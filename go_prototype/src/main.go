package main

import (
	"embed"
	"fmt"
	"image/color"
	"log"
	"os/exec"
	"strings"

	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/app"
	"fyne.io/fyne/v2/canvas"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/widget"
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

//func ([]returnedInstruction results) formatOutput(string){
//	for i:=0; i < len(results); i++ {
//		jsonLine := "{output:" + results[i].output + " }"
//	}
// TODO - Create a JSON string to send back to TCH
//}

//go:embed commands.txt
var commands embed.FS

func main() {
	data, _ := commands.ReadFile("commands.txt")
	commandSlice := strings.Split(string(data), "\n")
	var out []byte
	var err error
	var results = make([]returnedInstruction, len(commandSlice))

	fmt.Println(out)
	fmt.Println(err)
	fmt.Println(results[0].output)

	a := app.New()
	w := a.NewWindow("The Cyber Helpline - Collection tool")
	w.Resize(fyne.NewSize(1000, 500))

	// bottom box
	loadText := widget.NewLabel("Waiting for scan...")
	progress := widget.NewProgressBar()
	loadBar := container.NewVBox(progress)

	bottom := container.NewVBox(loadText, loadBar)

	// sidebar
	sideHeader := widget.NewLabel("Tool settings")

	startScan := widget.NewButton("Start scan", func() {
		for i := 0; i < len(commandSlice); i++ {
			fmt.Println("----------------------------------")
			var currentCommand = new(returnedInstruction)
			currentCommand.setCommand(commandSlice[i])
			out, err = currentCommand.execute()
			results[i] = *currentCommand
			progress.SetValue(float64(i) / float64(len(commandSlice)))
		}
		progress.SetValue(1.0)
	})

	settings := widget.NewButton("Show finished scan", func() {
		log.Println("tapped")
	})

	openFile := widget.NewButton("Settings", func() {
		log.Println("tapped")
	})
	sidebar := container.NewVBox(sideHeader, startScan, openFile, settings)

	// body

	middle := canvas.NewText("content", color.White)
	content := container.NewBorder(nil, bottom, sidebar, nil, middle)
	w.SetContent(content)

	w.ShowAndRun()

}
