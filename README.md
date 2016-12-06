# StringBuilder
 **Exercise to create a tool to improve the concatenation of strings.**

##  cat(value1[, value2 [,valueN]])
Method to add values to the buffer of the StringBuilder.
- **Sintax**
    ```js
        var sb = stringBuilder();
        sb.cat('hello');
        sb.cat('Javascript', 'crazy', 'world').cat('!!!');
        sb.cat(['nestedValue1', 'nestedValue2']).cat(() => 'Hello my Function');
    ```

- **Paramters**
    * values
        * Could be strings, arrays and functions.

## string()
This method returns a concatenated string of all the parameters that are in the buffer.

- **Sintax**

    ```js
        var sb = stringBuilder();
        sb.cat('hello', '!!');
        sb.string(); // 'hello!!'
    ```


