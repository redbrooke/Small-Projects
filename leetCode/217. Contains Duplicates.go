func containsDuplicate(nums []int) bool {

    match := false;
    for i := 0; i < len(nums); i++ {
        for j := 0; j < len(nums); j++ {
            if (nums[i] == nums[j] && i != j){
                match = true;
                return match;
            }
        }
    }

    return match;
}
