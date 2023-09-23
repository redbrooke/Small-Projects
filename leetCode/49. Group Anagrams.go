// INCOMPLETE
package main

import (
    "fmt"
)

func groupAnagrams(strs []string) [][]string {    
    
    m := make(map[string]int);
    answer := make([][]string, 9)
    nextIndex := 0;
    fmt.Println(m);
    fmt.Println(nextIndex);
    // Map used for: organized phrase, index in return array.
    
    for i := 0; i < len(strs); i++ {
        organize := []rune(strs[i]);
        // Organize string into same order
        for x := range organize{
            y := x + 1
            for y = range organize{
                if organize[x] < organize[y] {
                    organize[x], organize[y] = organize[y], organize[x]
                }
            }
        }
        // If the element doesn't exist yet add it
        // ADD IT TO SLICE TODO TODO <<-------
        hashed := string(organize);
        _, found := m[hashed]
        if (!found){
            m[hashed] = nextIndex;
            tmp := []string{strs[i]}
            answer[nextIndex] = append(tmp);
            nextIndex++
        }

        fmt.Println(organize)
        // Add to index
    }
    return answer;
}

