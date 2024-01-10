package main

import (
	"embed"
	"fmt"
	"log"
	"os"
	"os/exec"
	"path/filepath"
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
	fmt.Println("Running:", command.command)

	cmd := exec.Command("powershell", "-nologo", "-noprofile", "-command", command.command)

	out, err := cmd.CombinedOutput()
	fmt.Println(out)
	fmt.Println(command.command)
	fmt.Println("Command run:", command.command)

	switch {
	case err != nil:
		command.success = false
	default:
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

func createSettings(a fyne.App, iconResource *fyne.StaticResource) {
	w2 := a.NewWindow("Settings Menu")
	w2.Resize(fyne.NewSize(400, 300))
	w2.SetContent(container.NewVBox())
	w2.SetIcon(iconResource)
	w2.Show()
}

//go:embed helpline.png
var imageData []byte

//go:embed smallLogo.png
var smallLogo []byte

//go:embed commands.txt
var commands embed.FS

//go:embed shield.png
var shield []byte

func main() {
	data, err := commands.ReadFile("commands.txt")
	if err != nil {
		log.Fatal("Error opening file:", err)
	}

	commandSlice := strings.Split(strings.TrimSpace(string(data)), "\n")
	results := make([]returnedInstruction, len(commandSlice))

	a := app.New()
	w := a.NewWindow("The Cyber Helpline - Collection tool")
	w.Resize(fyne.NewSize(1000, 500))
	iconResource := fyne.NewStaticResource("icon.png", smallLogo)
	w.SetIcon(iconResource)

	// bottom box
	loadText := widget.NewLabel("Waiting for scan...")
	progress := widget.NewProgressBar()
	loadBar := container.NewVBox(progress)

	bottom := container.NewVBox(loadBar, loadText)

	// sidebar
	sideHeader := widget.NewLabel("Tool settings")

	startScan := widget.NewButton("Start scan", func() {
		for i := 0; i < len(commandSlice); i++ {
			fmt.Println("----------------------------------")
			currentCommand := new(returnedInstruction)
			currentCommand.setCommand(commandSlice[i])
			out, err := currentCommand.execute()
			results[i] = *currentCommand
			progress.SetValue(float64(i) / float64(len(commandSlice)))

			if err != nil {
				log.Printf("Error executing command %s: %v", commandSlice[i], err)
			}
			fmt.Printf("Output of command %s: %s\n", commandSlice[i], out)
		}
		progress.SetValue(1.0)

		filename := "The Cyber Helpline Output.txt"
		content := []byte("Your scan output\n")
		file, err := os.Create(filename)
		defer file.Close()
		if err != nil {
			log.Println("Error opening file:", err)
		}
		for _, result := range results {
			newString := fmt.Sprintf("%+v", result)
			writeableOutput := []byte(newString)
			content = append(content, writeableOutput...)
		}
		bytesWritten, err := file.Write(content)
		if err != nil {
			log.Println("Error when writing to file:", err)
			return
		}
		fmt.Printf("Bytes written: %d\n", bytesWritten)
	})

	openFile := widget.NewButton("Show finished scan", func() {
		log.Println("tapped")
		// Get the current directory
		dir, err := filepath.Abs(filepath.Dir(os.Args[0]))
		if err != nil {
			panic(err)
		}

		// Open the file browser for Windows
		cmd := exec.Command("explorer", dir)
		err = cmd.Start()
		if err != nil {
			panic(err)
		}
	})

	settings := widget.NewButton("Settings", func() {
		log.Println("tapped")
		createSettings(a, iconResource)
	})

	bodyImage := fyne.NewStaticResource("bodyImage.png", imageData)
	finalImage := canvas.NewImageFromResource(bodyImage)

	sidebar := container.NewVBox(sideHeader, finalImage, startScan, openFile, settings)

	// body

	shieldImage := fyne.NewStaticResource("shield.png", shield)
	shieldImageFinal := canvas.NewImageFromResource(shieldImage)

	edge := widget.NewSeparator()
	//window := widget.NewTextGridFromString("No scan completed ")
	middle := container.NewBorder(edge, edge, edge, edge, shieldImageFinal)

	content := container.NewBorder(nil, bottom, sidebar, nil, middle)
	w.SetContent(content)

	w.ShowAndRun()
}
