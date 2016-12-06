# StringBuilder
 **Exercise to create a tool to improve the concatenation of strings.**

##  cat(value1[, value2 [,valueN]])
Method to add values to the buffer
- **Sintax**
    ```js
        var sb = tringBuilder();
        sb.cat('hello');
        sb.cat('Javascript', 'crazy', 'world').cat('!!!');
        sb.cat(['nestedValue1', 'nestedValue2']).cat(() => 'Hello my Function');
    ```
- **Paramters**
    * values
        * Could be strings, arrays and functions.