// Unfinished
func findMedianSortedArrays(nums1 []int, nums2 []int) float64 {

    for i, j := 0, len(nums2); i < len(nums1); i,j = i+1, j-1{
        fmt.Print("weGo");

        if (i > len(nums1)){
            i = len(nums1) -1;
        }
        if (j-1 == -1){
            j = 0;
        }

            // IF 
            if nums1[i] < nums2[j] && (i-1) != -1 && (j+1) != -1 {
                fmt.Print("We adding %d + %d", nums1[i], nums2[j - 1]);
                var returnMe float64 = float64(nums1[i] + nums2[j - 1]); 
                return float64(returnMe / 2);
            }
            if nums1[i] == nums2[j]{
                return float64(nums1[i]);
            }
    }
    return float64(-1);
}
