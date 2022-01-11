import requests

def getExampleData(userCount, biasArray):

    biasArrayString = ""
    count = 0

    for element in biasArray:
        biasArrayStringAdd = ""
        if count != 0:
            biasArrayString += "-"
        biasArrayStringAdd += "{"
        biasArrayStringAdd += "%22bias%22:{},%22timeAccelerator%22:{}".format(element[0], element[1])
        biasArrayStringAdd += "}"
        biasArrayString += biasArrayStringAdd
        count += 1
        

    response = requests.get(("http://localhost:3000/getExampleData?userCount={}&biasArray={}").format(userCount, biasArrayString))
    exampleData = response.content.decode()

    return exampleData

exampleData = getExampleData(

    # userCount:

    #number of user results generated

    300,

    # biasArray:

    #array of bias and timeAccelerators: [bias, timeAccelerator]
    #bias of 1 means the activitiy has no effect on the user, timeAccelerator replicates a general increase in the effects of the activity (good or bad) over time (given bias does not equal 1): set to an extremely high value (e.g. 1000) to disregard this
    #[1.25 or 0.75, 24] is a great start
    # min. length 1, no max length but the real data will have 7 or 8 categories

    [[1, 24], [1.25, 24], [0.75, 24], [1, 24], [1.25, 12], [0.75, 12], [1.25, 48], [1.25, 1000]]

)

#understanding the results array: an array of 'monthly' wellbeing score arrays
#understanding the 'monthly' wellbeing score arrays: the first element is the month they started (0 is jan, 11 is dec) and the other elements are wellbeing categories which are effected differently by the activity based on the corresponding element in the biasArray

# TASK: produce a machine learning model that can predict the results of each category in an individuals wellbeing test over time
# use PyTorch
# don't overtrain the model