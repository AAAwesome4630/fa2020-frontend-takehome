const { useState, useEffect } = React;

const FoodItem = (name, calories, carbs, quantity, key) => {

    return (
        <tr key={key}>
            <th>{name}</th>
            <th>{calories}</th>
            <th>{carbs}</th>
            <th>{quantity}</th>
        </tr>
    )
}

const Table = () => {

    const [foodItems, setFoodItems] = useState();


    function formatData(data) {
        var FoodItemList = [];
        var foodsList = data["foods"];
        for (var i = 0; i < foodsList.length; i++) {
            var foodItem = foodsList[i];
            FoodItemList.push(FoodItem(foodItem["name"],
                foodItem["calories"],
                foodItem["carbohydrates"],
                foodItem["quantity"],
                i))
        }
        return FoodItemList;
    }

    async function fetchApiData() {
        const foodApiData = await fetch('https://founders-takehome-api.herokuapp.com/api/fetch')
        foodApiData
            .json()
            .then(foodApiData => setFoodItems(formatData(foodApiData)))
    }

    useEffect(() => {
        fetchApiData();
    }, []);

    return (
        <section>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Calories</th>
                        <th>Carbs</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {foodItems}
                </tbody>
            </table>
        </section>
    )
}

const domContainer = document.querySelector('#table');
ReactDOM.render(<Table />, domContainer);