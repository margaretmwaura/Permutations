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

<!--        <li v-for="item in words" :key="item">-->
<!--            <p>{{ item }}</p>-->
<!--        </li>-->
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
                let original = this.letters;
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
                let words = function (count, round) {
                    for (let j = 0; j < length; j++) {
                        let mine = variable.concat();
                        mine[length] = mine[j];
                        let newString = mine.join('');
                        results.push(newString);
                        console.log(count, round);
                        if (j === lengthMinusOne) {
                            if (count < lengthMinusOne) {
                                console.log("We have arrived at the less harder part");
                                return;
                            }
                            if (count === lengthMinusOne) {
                                if (round < length) {
                                    variable[lengthMinusOne] = original[round];
                                    round += 1;
                                    words(count, round);
                                } else {
                                    console.log("round become greater than length with the value of " + round);
                                    words(count - 1, 0);
                                }
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
