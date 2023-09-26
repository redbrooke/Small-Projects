package main

import (
    "fmt"
)

func groupAnagrams(strs []string) [][]string {    
    
    m := make(map[string]int);
    answer := make([][]string, 0)
    s := make([]string, 0)

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
            //tmp := []string{strs[i]}
            tmp := strs[i]
            answer = append(answer, s)
            answer[nextIndex] = append(answer[nextIndex], tmp);
            nextIndex++
        }
        if(found){
            fmt.Println("Hello")
            fmt.Println(m[hashed]);
            fmt.Println(m);
            //tmp := []string{strs[i]}
            tmp := strs[i]
            answer[m[hashed]] = append(answer[m[hashed]], tmp);
        }
        fmt.Println(organize)
        // Add to index
    }
    return answer;
}
