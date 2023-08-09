func isPalindrome(x int) bool {
    number := strconv.Itoa(x);
    startPointer := 0;
    endPointer := len(number)-1;
    output := true;

    for i:=1; i < len(number); i++ {
        if startPointer == endPointer{
              break;
        }
        if ([]rune(number)[startPointer] != []rune(number)[endPointer]) {
                output = false;
        }
        startPointer++;
        endPointer--;  
    }

    return output;
}
