/** @param {NS} ns **/
// as long as i don't have a solution for everything, i need to define the current solutions

export async function main(ns) {
    let solveable = [
        "Generate IP Addresses",
        "Spiralize Matrix",
        "Unique Paths in a Grid I",
        "Unique Paths in a Grid II",
        "Minimum Path Sum in a Triangle",
        "Find Largest Prime Factor",
        "Subarray with Maximum Sum",
        "Merge Overlapping Intervals",
        "Array Jumping Game",
        "Algorithmic Stock Trader I",
        "Algorithmic Stock Trader II",
        "Algorithmic Stock Trader III",
        "Algorithmic Stock Trader IV",
        "Total Ways to Sum",
        "Sanitize Parentheses in Expression",
        "Find All Valid Math Expressions"]

    function mathExpressions(data) {
        const num = String(data[0]); // Array.from(String(data).padStart(4,0), Number)
        const target = data[1];

        function helper(res, path, num, target, pos, evaluated, multed) {
            if (pos === num.length) {
                if (target === evaluated) {
                    res.push(path);
                }
            }

            for (let i = pos; i < num.length; ++i) {
                if (i != pos && num[pos] == "0") {
                    break;
                }
                const cur = parseInt(num.substring(pos, i + 1));

                if (pos === 0) {
                    helper(res, path + cur, num, target, i + 1, cur, cur);
                } else {
                    helper(res, path + "+" + cur, num, target, i + 1, evaluated + cur, cur);
                    helper(res, path + "-" + cur, num, target, i + 1, evaluated - cur, -cur);
                    helper(res, path + "*" + cur, num, target, i + 1, evaluated - multed + multed * cur, multed * cur);
                }
            }
        }
        const result = [];
        helper(result, "", num, target, 0, 0, 0);
        return result;
    }
    function SanitizeParensSolver(data) {
        var left = 0
        var right = 0
        var res = []
        for (var i = 0; i < data.length; ++i) {
            if (data[i] === '(') {
                ++left
            } else if (data[i] === ')') {
                left > 0 ? --left : ++right
            }
        }

        function dfs(pair, index, left, right, s, solution, res) {
            if (s.length === index) {
                if (left === 0 && right === 0 && pair === 0) {
                    for (var i = 0; i < res.length; i++) {
                        if (res[i] === solution) {
                            return
                        }
                    }
                    res.push(solution)
                }
                return
            }
            if (s[index] === '(') {
                if (left > 0) {
                    dfs(pair, index + 1, left - 1, right, s, solution, res)
                }
                dfs(pair + 1, index + 1, left, right, s, solution + s[index], res)
            } else if (s[index] === ')') {
                if (right > 0) dfs(pair, index + 1, left, right - 1, s, solution, res)
                if (pair > 0) dfs(pair - 1, index + 1, left, right, s, solution + s[index], res)
            } else {
                dfs(pair, index + 1, left, right, s, solution + s[index], res)
            }
        }

        dfs(0, 0, left, right, data, '', res)
        return res
    }
    function totalWaysToSum(data) {
        const ways = [1];
        ways.length = data + 1;
        ways.fill(0, 1);
        for (let i = 1; i < data; ++i) {
            for (let j = i; j <= data; ++j) {
                ways[j] += ways[j - i];
            }
        }
        return ways[data];
    }
    function stockTrader(data) {
        const k = data[0];
        const prices = data[1];
        const len = prices.length;
        if (len < 2) {
            return 0
        }
        if (k > len / 2) {
            let res = 0;
            for (let i = 1; i < len; ++i) {
                res += Math.max(prices[i] - prices[i - 1], 0);
            }
            return res;
        }
        const hold = [];
        const rele = [];
        hold.length = k + 1;
        rele.length = k + 1;
        for (let i = 0; i <= k; ++i) {
            hold[i] = Number.MIN_SAFE_INTEGER;
            rele[i] = 0;
        }
        let cur;
        for (let i = 0; i < len; ++i) {
            cur = prices[i];
            for (let j = k; j > 0; --j) {
                rele[j] = Math.max(rele[j], hold[j] + cur);
                hold[j] = Math.max(hold[j], rele[j - 1] - cur);
            }
        }
        return rele[k];
    }
    function arrayJump(array) {
        let i, j;
        i = j = array.length - 1
        j--
        while (array[j] != undefined) {
            if (array[j] >= (i - j)) {
                i = j
                if (i == 0) {
                    return 1
                }
                j--
            }
            else { j-- }
            if (array[j] == undefined) {
                return 0
            }
        }
    }
    function arrayMerger(data) {
        data.sort((a, b) => a[0] - b[0]);
        let result = [];
        while (data.length > 0) {
            let tempResult = data.shift();
            let submerge = true
            while (submerge) {
                let tempMin = tempResult[0];
                let tempMax = tempResult[1];
                if (data.length > 0) {
                    if (data[0][0] >= tempMin && data[0][0] <= tempMax) {
                        if (data[0][1] > tempMax) {
                            tempResult[1] = data[0][1];
                        }
                        data.shift()
                    }
                    else { submerge = false }
                }
                else { submerge = false }
            }
            result.push(tempResult)
        }
        return result;
    }
    function largestPrimeFactor(data) {
        let n = parseInt(data, 10);
        let cache = [];
        let i = 2
        while (i <= n && n != 1) {
            if (Number.isInteger(n / i)) {
                cache.push(i);
                n /= i
            }
            else { i++ }
        }
        return cache.pop()
    }
    function subarraySum(data) {
        let Sum = (a, b) => a + b
        let cache = []
        cache.push(data.reduce(Sum));
        let i, j;
        i = 0;
        j = 1;
        while (i < data.length) {
            let tempData = JSON.parse(JSON.stringify(data))
            let tempSplice = tempData.splice(i, j)
            let arraylength = tempData.length + tempSplice.length
            cache.push(tempSplice.reduce(Sum))
            if (j < arraylength - i) {
                j++
            }
            else if (i < arraylength) {
                i++;
                j = 1
            }
        }
        return cache.sort((a, b) => a - b).pop()
    }
    function generateIPs(data) {
        function checkOnlyZero(digit, length) { // to use, if the 0 is the only digit in the segment
            if (length > 1 && digit == 0) {
                return false;
            }
            return true
        }
        let dataArray = Array.from(String(data), String)
        let result = [];
        let i, j, k;
        i = j = k = 1; // for splicing segment 1-3
        let tempResult = [];  // save correct arrays here
        let tempCache = []; // for temporary check on result

        while (i < 4) {
            var tempData = JSON.parse(JSON.stringify(dataArray));
            if (tempData.length - i > 9) { // if rest is greater equals 10, than i has to be a higher value
                i++
            }
            if (tempData.length - i - j > 6) { // same as before
                j++
            }
            if (tempData.length - i - j - k > 3) { // same as before
                k++
            }
            else {
                let partString1 = tempData.splice(0, i).join(""); // splice and join the first segment.
                if (checkOnlyZero(tempData[0], j) && tempData.length > 2) { /*first number in the remaining array can't start with a 0, 
            if there are more than 2 numbers required. also need at least 3 entries remaining*/
                    let partString2 = tempData.splice(0, j).join(""); // splice+join second segment
                    if (checkOnlyZero(tempData[0], k) && tempData.length > 1) { // same as previous IF, just with at least 2 entries left
                        let partString3 = tempData.splice(0, k).join(""); // ""
                        if (checkOnlyZero(tempData[0], tempData.length) && tempData.length > 0) { // if last digit is solo and a 0 and at least 1 entry
                            let partString4 = tempData.join(""); //join the rest of the remaining entries
                            tempCache.push(partString1, partString2, partString3, partString4); // create an array of that result
                            if (!(tempCache.some(a => a < 0 || a > 255))) { // any in array in range between 0-255
                                tempResult.push(tempCache); // save the current result into a temporary result-list
                            }
                            tempCache = [] // forgot that one on previous version 😆
                        }
                    }
                }
                // increment segments splice 1-3 from back to front (ending with increment to i==4, which ends the while-loop)
                if (k == 3) {
                    if (j == 3) {
                        if (i == 3) {
                            i = 4
                        }
                        else {
                            i++;
                            j = 1;
                            k = 1
                        }
                    }
                    else {
                        j++
                        k = 1
                    }
                }
                else {
                    k++
                }
            }
        }
        for (var temp of tempResult) { // the "scan" is complete, now turn every subarray into a ip-adress-string
            result.push(temp.join("."))
        }
        return result
    }

    function spiralizeMatrix(data) {
        let res = [];
        let rotate = 11;
        let index_heigth = 0;
        let arr = data;
        while (arr.flat().length > 0) {
            if (rotate === 11) { // go right
                if (Array.isArray(arr[index_heigth]) && arr[index_heigth].length) {
                    var right = arr[index_heigth].shift();
                    res.push(right)
                }
                else {
                    rotate = 1;
                    index_heigth++;
                }
            }
            else if (rotate === 1) { // go down
                if (Array.isArray(arr[index_heigth]) && arr[index_heigth].length) {
                    var down = arr[index_heigth].pop();
                    res.push(down);
                    index_heigth++;
                }
                else {
                    index_heigth--;
                    rotate = 0
                }
            }
            else if (rotate === 0) { // go left
                if (Array.isArray(arr[index_heigth]) && arr[index_heigth].length) {
                    var left = arr[index_heigth].pop();
                    res.push(left)
                }
                else {
                    index_heigth--;
                    rotate = 10
                }
            }
            else if (rotate === 10) { // and up
                if (Array.isArray(arr[index_heigth]) && arr[index_heigth].length) {
                    var up = arr[index_heigth].shift();
                    res.push(up);
                    index_heigth--
                }
                else {
                    index_heigth++;
                    rotate = 11
                }
            }
        }
        return res
    }

    function uniquePaths1(data) {
        let m = data[0];
        let n = data[1];
        const total = m + n - 2;
        let k = n - 1;
        if (k === 0) return 1;
        let top = 1;
        let bottom = 1;
        for (let i = 0; i < k; i++) {
            top *= total - i;
            bottom *= i + 1;
        }
        return top / bottom;
    }

    function uniquePaths2(A) {

        let r = (A.length), c = (A[0].length);
        // create a 2D-matrix and initializing
        // with value 0
        let paths = new Array(r);
        for (let i = 0; i < r; i++) {
            paths[i] = new Array(c);
            for (let j = 0; j < c; j++) {
                paths[i][j] = 0;
            }
        }
        // Initializing the left corner if
        // no obstacle there
        if (A[0][0] == 0)
            paths[0][0] = 1;
        // Initializing first column of
        // the 2D matrix
        for (let i = 1; i < r; i++) {
            // If not obstacle
            if (A[i][0] == 0)
                paths[i][0] = paths[i - 1][0];
        }
        // Initializing first row of the 2D matrix
        for (let j = 1; j < c; j++) {
            // If not obstacle
            if (A[0][j] == 0)
                paths[0][j] = paths[0][j - 1];
        }
        for (let i = 1; i < r; i++) {
            for (let j = 1; j < c; j++) {
                // If current cell is not obstacle
                if (A[i][j] == 0)
                    paths[i][j] = paths[i - 1][j] +
                        paths[i][j - 1];
            }
        }
        // Returning the corner value
        // of the matrix
        return paths[r - 1].pop();
    }
    function minSumPath(A) {
        let memo = [];
        let n = A.length - 1;
        for (let i = 0; i < A[n].length; i++)
            memo[i] = A[n][i];
        for (let i = A.length - 2; i >= 0; i--)
            for (let j = 0;
                j < A[i].length; j++)
                memo[j] = A[i][j] +
                    Math.min(memo[j],
                        memo[j + 1]);
        return memo[0];
    }
    function allServers(ns) {
        const nodes = new Set
        function dfs(node) {
            nodes.add(node);
            for (const neighbor of ns.scan(node)) {
                if (!nodes.has(neighbor)) {
                    dfs(neighbor)
                }
            }
        }
        dfs("home")
        return [...nodes]
    }
    
    let cc_servers = allServers(ns).map(am => { return { name: am, ccLs: ns.ls(am, ".cct") } })
    for (var ccServer of cc_servers) {
        if (ccServer.ccLs.length > 0) {
            for (var ccFile of ccServer.ccLs) {
                let ccType = await ns.codingcontract.getContractType(ccFile, ccServer.name);
                let ccData = await ns.codingcontract.getData(ccFile, ccServer.name);
                if (solveable.some(s => s == ccType)) {
                    let ccResult;
                    if (ccType == solveable[0]) {
                        ccResult = generateIPs(ccData)
                    }
                    if (ccType == solveable[1]) {
                        ccResult = spiralizeMatrix(ccData)
                    }
                    if (ccType == solveable[2]) {
                        ccResult = uniquePaths1(ccData)
                    }
                    if (ccType == solveable[3]) {
                        ccResult = uniquePaths2(ccData)
                    }
                    if (ccType == solveable[4]) {
                        ccResult = minSumPath(ccData)
                    }
                    if (ccType == solveable[5]) {
                        ccResult = largestPrimeFactor(ccData)
                    }
                    if (ccType == solveable[6]) {
                        ccResult = subarraySum(ccData)
                    }
                    if (ccType == solveable[7]) {
                        ccResult = arrayMerger(ccData)
                    }
                    if (ccType == solveable[8]) {
                        ccResult = arrayJump(ccData)
                    }
                    if (ccType == solveable[9]) {
                        var stock1 = [1, ccData]
                        ccResult = stockTrader(stock1)
                    }
                    if (ccType == solveable[10]) {
                        var stock2 = [ccData.length + 1, ccData]
                        ccResult = stockTrader(stock2)
                    }
                    if (ccType == solveable[11]) {
                        var stock3 = [2, ccData]
                        ccResult = stockTrader(stock3)
                    }
                    if (ccType == solveable[12]) {
                        ccResult = stockTrader(ccData)
                    }
                    if (ccType == solveable[13]) {
                        ccResult = totalWaysToSum(ccData)
                    }
                    if (ccType == solveable[14]) {
                        ccResult = SanitizeParensSolver(ccData)
                    }
                    if (ccType == solveable[15]) {
                        ccResult = mathExpressions(ccData)
                    }
                    if (ccResult != null) {
                        let ccTry = ns.codingcontract.attempt(ccResult, ccFile, ccServer.name, { returnReward: true })
                        if (ccTry == null || ccTry == "") {
                            fail = true;
                            ns.tprint("WARNING: Failed Contract Type: " + ccType + " @" + ccServer.name +
                                "\nData from Contract: " + JSON.stringify(ccData) +
                                "\nResult from Solver: " + JSON.stringify(ccResult))
                        }
                        else {
                            ns.tprint("INFO: @" + ccServer.name + " Contract \"" + ccType + "\" successful." +
                                "\n Reward: " + ccTry)
                        }
                    }
                }
                await ns.sleep(50)
            }
            await ns.sleep(50)
        }
    }
}