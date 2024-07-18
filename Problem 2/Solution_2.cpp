#include <bits/stdc++.h>
using namespace std;

double findMaxAverage(vector<int>& nums, int k) {
    int n = nums.size();
    double max_avg = INT_MIN;

    for (int len = k; len <= n; ++len) {
        double sum = 0;
        for (int i = 0; i < len; ++i) {
            sum += nums[i];
        }
        double avg = sum / len;
        max_avg = max(max_avg, avg);

        for (int i = len; i < n; ++i) {
            sum += nums[i] - nums[i - len];
            avg = sum / len;
            max_avg = max(max_avg, avg);
        }
    }
    return max_avg;
}

// Driver program
int main() {
    int n; cin>>n;
    vector<int> nums ;
    for(int i =0 ;i<n ; i++) {
        int num ; cin>>num;
        nums.push_back(num);
    }
    int k ; cin>> k ;
    cout << findMaxAverage(nums, k) << endl;
    return 0;
}


// Example:
// Input: {1,12,-5,-6,50,3}, k = 4
// Output: 12.75