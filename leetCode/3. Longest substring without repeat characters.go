func contains(s []string, str string) bool {
	for _, v := range s {
		if v == str {
			return true
		}
	}
	return false
}

func lengthOfLongestSubstring(s string) int {
    var uniqueChar []string;
    clearing := false;
    longestLen := 0;

    for i := 0; i < len(s); i++ {

        if (contains(uniqueChar, string(s[i]))){
            clearing = true;
            if len(uniqueChar) > longestLen {
                 longestLen = len(uniqueChar);
            }
            for (clearing) {
                if (uniqueChar[0] != string(s[i])){
                    uniqueChar = uniqueChar[1:]
                } else {
                    uniqueChar = uniqueChar[1:]
                    clearing = false;
                }
            }
        }

        uniqueChar = append(uniqueChar, string(s[i]));
        //fmt.Printf("%v", uniqueChar)
    }

    if len(uniqueChar) > longestLen {
        longestLen = len(uniqueChar);
    }

    return longestLen;
}
