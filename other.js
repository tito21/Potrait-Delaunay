
function binarySearch(arr, x) {

    let start = 0, end = arr.length - 1;

    // Iterate while start not meets end
    while (start <= end) {

        // Find the mid index
        let mid = Math.floor((start + end) / 2);

        // If element is present at mid, return True
        if ((arr[mid + 1] > x) && (arr[mid] < x)) return mid;

        // Else look in left or right half accordingly
        else if (arr[mid] < x)
            start = mid + 1;
        else
            end = mid - 1;
    }

}


function getRandomPoint(CDF) {
    let x = random(width);
    let s = random(1);

    let y = binarySearch(CDF, s);

    // x = map(x, 0, CDF.length, 0, width);
    console.log("X", x);
    return [x, y];
}
