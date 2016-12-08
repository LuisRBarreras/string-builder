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

- **Parameters**
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


## rep(args1[, argN] ,howManyTimes)
Method that concatenates the same string a given number of times.
- **Sintax**
    ```js
        var sb = new StringBuilder();
        sb.cat('Can I go,')
            .rep('please ', 2)
            .rep('?',3)
    ```

- **Parameters**
    * args
        * string values
    * howManyTimes
        * number of times to repeat string