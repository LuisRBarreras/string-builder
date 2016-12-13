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


## catIf(args1[,argsN], flag)
Method that performs string concatenation only if the flag is true.
- **Sintax**
    ```js
         sb.cat('Hello')
            .catIf('EveryOne', myMood === 'happy');
    ```

- **Parameters**
    * args
        * string values
    * flag
        * boolean value


## wrap(prefix, suffix)
Everything added to StringBuilder after this method is called shall be be surrounded by prefix and suffix arguments.
- **Sintax**
    ```js
        sb.cat('<ul>', '\n')
            .wrap('<li>', ['</li>' ,'\n'])
            .rep('list item', 2)
            .end()
            .cat('</ul>'); // <ul>\n<li>list item</li>\n<li>list item</li>\n</ul>        
    ```

- **Parameters**
    * prefix
        * strings, functions, arrays
    * suffix
        * strings, functions, arrays

## end()
Cancel the current or last effect that was added to the StringBuilder by calling any of the folloowing methods: wrap.

## prefix(args)
Everything added after calling this method shall be prefix with the specified arguments.
- **Sintax**
    ```js
         sb.prefix('##')
            .cat('YEI')
            .cat(['!'])
            .string(); // "##YEI##!";
    ```
- **Parameters**
    * args
        * strings, functions, arrays

## suffix(args)
Everything added after calling this method shall be suffix with the specified arguments.
- **Sintax**
    ```js
     sb.suffix('\n')
            .cat('Hello')
            .cat(['World'])
            .string(); // Hello\nWrold\n
    ```
- **Parameters**
    * args
        * strings, functions, arrays

## each(collection, callback)
Allows the iteration over an array of values without breaking the cascasde or chain.
It shall to iterate over each value on the array and then call the callback function.
The each method will call the callback setting the context(_this_) referense to the
StringBuilder and will send 3 three parameters _value_ , _index_  and _args_ .
- **Sintax**
    ```js
        sb.each(people, function(value, index, people) {
                this
                    .cat('<tr>')
                    .prefix('\t')
                    .cat('<td>' + value.name + '</td>')
                    .cat('<td>' + value.age + '</td>')
                    .end()
                    .cat('</tr>')
            });
    ```

- **Parameters**
    * collection
        * array
    * callback
        * function
            * with parameters value, index and people