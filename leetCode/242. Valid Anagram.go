package main
  
import (
    "fmt"
)
  
func isAnagram(s string, t string) bool {

    answer := make(map[rune]int);

    for  _, next := range s{
        answer[next]++;
    }

    for _, next := range t {
        answer[next]--;
    }

    for _, val := range answer{
        if val != 0{
            return false;
        }
    }
    return true;
}
