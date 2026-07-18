# Drug Classification

A machine learning project that explores patient-related features and predicts one of five drug categories using classification algorithms.

> **Disclaimer:** This project is for educational and portfolio purposes only. It must not be used for medical diagnosis, prescription, or treatment decisions.

## Project Overview

This project uses exploratory data analysis, statistical testing, feature engineering, and machine learning to examine the relationship between patient characteristics and drug categories.

The workflow includes:

- Data inspection and descriptive statistics
- Exploratory data analysis and visualization
- Correlation analysis
- Chi-square testing
- Categorical feature encoding
- Feature engineering
- Feature scaling
- Multiclass classification
- Model evaluation and comparison

## Dataset

The dataset contains **200 records** and **7 original columns**.

| Feature | Description |
|---|---|
| `Age` | Patient age |
| `Sex` | Patient sex |
| `BP` | Blood pressure category |
| `Cholesterol` | Cholesterol category |
| `Na` | Sodium measurement |
| `K` | Potassium measurement |
| `Drug` | Target drug category |

The target variable contains five classes:

- `drugA`
- `drugB`
- `drugC`
- `drugX`
- `drugY`

No missing values were detected in the dataset.

## Exploratory Data Analysis

The notebook includes:

- Summary statistics for numerical variables
- Frequency and percentage tables for categorical variables
- Age box plot
- Sodium and potassium histograms
- Drug distribution by sex, blood pressure, and cholesterol
- Feature distributions across drug categories
- Correlation heatmap
- Pearson and Spearman correlation tests
- Sodium-versus-potassium scatter plots
- Chi-square test between sex and drug category

## Feature Engineering

A sodium-to-potassium ratio was created:

```text
Na/K = Na ÷ K
```

Categorical variables were encoded as follows:

- `Sex`
- `BP`
- `Cholesterol`
- `Drug`

The full feature set initially included:

- `Age`
- `Sex_encoded`
- `BP_encoded`
- `Cholesterol_encoded`
- `Na`
- `K`
- `Na/K`

The final models used:

- `Age`
- `BP_encoded`
- `Cholesterol_encoded`
- `Na/K`

`Age` and `Na/K` were standardized using `StandardScaler`.

## Train-Test Split

The data was divided into:

- **50% training data**
- **50% testing data**
- `random_state=42`

This resulted in 100 training observations and 100 testing observations.

## Machine Learning Models

### Decision Tree Classifier

The Decision Tree achieved:

- Training accuracy: **100%**
- Testing accuracy: **100%**

The learned decision rules were also extracted and the tree was visualized using Graphviz.

### Logistic Regression

The Logistic Regression model achieved:

- Training accuracy: **94%**
- Testing accuracy: **98%**

## Model Comparison

| Model | Training Accuracy | Testing Accuracy |
|---|---:|---:|
| Decision Tree | 100% | 100% |
| Logistic Regression | 94% | 98% |

The Decision Tree produced the highest accuracy on this split. However, the dataset is small and the notebook uses a single train-test split without cross-validation. Therefore, these results should not be interpreted as evidence of real-world clinical performance.

## Technologies Used

- Python
- Pandas
- NumPy
- Matplotlib
- Seaborn
- SciPy
- Scikit-learn
- Graphviz
- Jupyter Notebook
- Kaggle

## Repository Structure

```text
drug-classification/
├── drug-classification.ipynb
└── README.md
```

## Running the Project

Install the required libraries:

```bash
pip install pandas numpy matplotlib seaborn scipy scikit-learn graphviz
```

The notebook was originally developed on Kaggle and reads the dataset from a Kaggle input path. When running it locally, update the CSV path to the location of your local dataset.

## Key Learning Outcomes

This project demonstrates how to:

- Explore structured numerical and categorical data
- Create informative statistical summaries and visualizations
- Apply basic statistical tests
- Encode categorical features
- Engineer a predictive ratio feature
- Scale selected numerical variables
- Train multiclass classification models
- Compare models using accuracy, confusion matrices, and classification reports
- Interpret Decision Tree rules

## Future Improvements

Possible improvements include:

- Using a stratified train-test split
- Applying cross-validation
- Comparing additional classification algorithms
- Performing hyperparameter tuning
- Improving class-label handling in evaluation reports
- Adding feature importance analysis
- Creating a reproducible local data-loading workflow