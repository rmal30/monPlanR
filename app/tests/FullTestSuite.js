import CounterTestSuite from "./CounterTestSuite";

const FullTestSuite = (setting="standard") => {

    CounterTestSuite(setting);
    
    if(setting !== "silent"){
        console.log("All tests passed")
    }

}

export default FullTestSuite