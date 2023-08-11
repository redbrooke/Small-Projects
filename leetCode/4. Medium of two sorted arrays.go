//UNFINISHED

func sizer(length int) int{
    if ((length -1) == -1){ return 0;} else {return 1;};
}

func findMedianSortedArrays(nums1 []int, nums2 []int) float64 {
    var fullLen int = sizer(len(nums2)); 

    for i, j := 0, fullLen; i < len(nums1); i,j = i+1, j-1{
        fmt.Print("weGo");
        if nums1[i] < nums2[j] && (i-1) != -1 && (j+1) != -1 {
            return float64((nums1[i-1] + nums2[j +1]) / 2);
        }
        if nums1[i] == nums2[j]{
            return float64(nums1[i]);
        }
    }
    return float64(-1);
}
