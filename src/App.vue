<template>
    <div style="margin-top: 50px">
        <input v-model="character" type="text">

        <br>
       <br>
        <button @click="get" class="button">Add Character </button>

        <br>
        <br>
        <button class="button" @click="generate">Generate</button>

        <br>
        <br>

    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "App",
        data() {
            return {
                character: '',
                letters : [],
                words : [],
                dictionary : []
            }
        },
        methods: {
            get : function () {
                this.letters.push(this.character);
                this.character = '';
                console.log(this.letters);
            },
            generate: function () {
                let results = [];
                let variable = this.letters;
                let dictionary = this.dictionary;
                let length = variable.length;
                // let words = function (variable,count) {
                //     let length = variable.length;
                //         for (let j = 0; j < length; j++) {
                //             let mine = variable.concat();
                //             let b = mine[0];
                //             mine[0] = mine[j];
                //             mine[j] = b;
                //             let newString = mine.join('');
                //             results.push(newString);
                //             console.log(newString, variable);
                //             if (j === length - 1) {
                //                 if (count === 0) {
                //                     let b = variable[0];
                //                     count = count + 1;
                //                     variable[0] = variable[count];
                //                     variable[count] = b;
                //                 } else {
                //                     let b = variable[0];
                //                     count = count + 1;
                //                     variable[0] = variable[count];
                //                     variable[count] = b;
                //                 }
                //                 if (count > length - 1) {
                //                     return
                //                 } else {
                //                     words(variable, count)
                //                 }
                //             }
                //         }
                // };
                // words(variable,0);
                let lengthMinusOne = length - 1;
                let lengthMinusOneOne = length - 2;
                let original = variable.concat();
                let words = function (count, round) {
                    for (let j = 0; j < length; j++) {
                        let mine = variable.concat();
                        mine[length -1] = original[j];
                        let newString = mine.join('');
                        results.push(newString);
                        console.log(newString , mine , variable , original , count , round);
                        if (j === lengthMinusOne) {
                            if (count < lengthMinusOne) {
                                // This indicates the number of times we are going to be looping
                                let looping = lengthMinusOne - count;
                                for (let i = 0; i < looping; i++) {
                                    let check = lengthMinusOneOne - i;
                                    if (looping === 1) {
                                        console.log("We only loop once");
                                        if (variable[check] === original[lengthMinusOne]) {
                                            variable[check] = original[0];
                                            variable[check - 1] = original[0];
                                            round = 0;
                                            count = count - 1;
                                            words(count, round);
                                        } else {
                                            variable[check] = original[round];
                                            round = round + 1;
                                            words(count, round);
                                        }
                                    } else {
                                        if (variable[check] === original[lengthMinusOne]) {
                                            let vsa = looping - 1;
                                            if (i === vsa) {
                                                console.log("Ma men we got to the end ");
                                                return;
                                            } else {
                                                console.log("We are done we are doing nothing " + vsa + " the value of i " + i +
                                                    " looping value " + looping + "check " + check);

                                                // Lets try implementing that of getting all the characters that should
                                                // be changed to the first letter

                                                let toBeChanged = variable.slice(check);
                                                console.log("Ma men this is what we be slicing " + toBeChanged
                                                    + " this is the variable check " + variable[check]);
                                                let indexOfCurrent = original.indexOf(variable[check - 1]);
                                                let nextCharacter = original[indexOfCurrent + 1];
                                                console.log("This is the index of the variable we were checking " + indexOfCurrent
                                                    + " and the character is " + variable[check - 1] +
                                                    " and we will be changing the cahracter to " + nextCharacter);
                                            }
                                        } else {
                                            if (round < length) {
                                                console.log("We is in the last else " + round);
                                                variable[check] = original[round];
                                                if (round === lengthMinusOne) {
                                                    round = 0
                                                } else {
                                                    round = round + 1;
                                                }
                                                words(count, round);
                                            }
                                        }
                                    }
                                }
                            }
                            if (count === lengthMinusOne) {
                                console.log("round become greater than length with the value of " + round);
                                variable[lengthMinusOne] = original[0];
                                let value = lengthMinusOne - 1;
                                variable[value] = original[0];
                                count = count - 1;
                                words(count, 0);
                            }
                            if (count === 0) {
                                return;
                            }
                        }
                        }
                    };
                words(length-1 , 0);
                this.words = results;
                console.log(results);
            }
        },
        mounted() {
            axios
                .get('http://localhost:4000/dictionary')
                .then(response => {
                    var code = response.status;
                    if(code === 200)
                    {
                        this.dictionary = JSON.parse(response.data.param);
                        console.log(this.dictionary);
                    }
                })
                .catch(error =>
                {
                    console.log(error);
                })
        }
    }
</script>

<style scoped>

</style>
