from __future__ import annotations

from pathlib import Path
from typing import Any

import numpy as np
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
import streamlit as st
from sklearn.base import clone
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, confusion_matrix, f1_score
from sklearn.model_selection import StratifiedKFold, cross_validate, train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.tree import DecisionTreeClassifier


# -----------------------------------------------------------------------------
# App configuration
# -----------------------------------------------------------------------------
st.set_page_config(
    page_title="DrugLens AI",
    page_icon="🧬",
    layout="wide",
    initial_sidebar_state="expanded",
)

ROOT = Path(__file__).resolve().parent
DATA_PATH = ROOT / "data" / "Drug.csv"
FEATURES = ["Age", "Sex_code", "BP_code", "Cholesterol_code", "Na_K"]
DISPLAY_FEATURES = {
    "Age": "Age",
    "Sex_code": "Sex",
    "BP_code": "Blood pressure",
    "Cholesterol_code": "Cholesterol",
    "Na_K": "Na/K ratio",
}
DRUG_ORDER = ["drugA", "drugB", "drugC", "drugX", "drugY"]
DRUG_COLORS = {
    "drugA": "#45E0C1",
    "drugB": "#A78BFA",
    "drugC": "#FFB86B",
    "drugX": "#5AB0FF",
    "drugY": "#FF6B9E",
}


# -----------------------------------------------------------------------------
# Styling
# -----------------------------------------------------------------------------
def inject_css() -> None:
    st.markdown(
        """
        <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        :root {
            --bg: #070B17;
            --panel: rgba(18, 25, 48, 0.72);
            --panel-strong: rgba(24, 33, 62, 0.92);
            --border: rgba(154, 174, 255, 0.16);
            --text: #F5F7FF;
            --muted: #9CA9C8;
            --cyan: #45E0C1;
            --purple: #A78BFA;
            --pink: #FF6B9E;
        }

        html, body, [class*="css"] { font-family: 'Inter', sans-serif; }
        .stApp {
            background:
                radial-gradient(circle at 15% 15%, rgba(69,224,193,.10), transparent 27%),
                radial-gradient(circle at 85% 12%, rgba(167,139,250,.13), transparent 28%),
                radial-gradient(circle at 70% 80%, rgba(255,107,158,.08), transparent 25%),
                #070B17;
            color: var(--text);
        }
        [data-testid="stSidebar"] {
            background: rgba(8, 13, 29, .94);
            border-right: 1px solid var(--border);
        }
        [data-testid="stHeader"] { background: transparent; }
        #MainMenu, footer { visibility: hidden; }
        .block-container { padding-top: 1.7rem; padding-bottom: 3rem; max-width: 1500px; }

        .hero {
            position: relative;
            overflow: hidden;
            padding: 2.1rem 2.2rem;
            border-radius: 28px;
            background: linear-gradient(125deg, rgba(20,31,62,.90), rgba(18,25,48,.68));
            border: 1px solid rgba(154,174,255,.18);
            box-shadow: 0 24px 80px rgba(0,0,0,.24);
            margin-bottom: 1.2rem;
        }
        .hero:after {
            content: '';
            position: absolute;
            right: -80px; top: -100px;
            width: 330px; height: 330px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(69,224,193,.21), transparent 66%);
        }
        .eyebrow { color: var(--cyan); font-size: .78rem; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; }
        .hero h1 { margin: .45rem 0 .4rem; font-size: clamp(2rem, 4vw, 4rem); line-height: 1; letter-spacing: -.045em; }
        .gradient-text { background: linear-gradient(90deg, #F5F7FF 15%, #45E0C1 55%, #A78BFA); -webkit-background-clip: text; color: transparent; }
        .hero p { max-width: 760px; color: var(--muted); font-size: 1.02rem; margin: 0; line-height: 1.75; }
        .hero-badges { display:flex; gap:.55rem; flex-wrap:wrap; margin-top:1.2rem; }
        .badge { padding:.4rem .7rem; border:1px solid var(--border); border-radius:999px; color:#CDD5ED; background:rgba(255,255,255,.035); font-size:.78rem; }

        .metric-card, .glass-card, .prediction-card, .insight-card {
            background: var(--panel);
            border: 1px solid var(--border);
            border-radius: 20px;
            box-shadow: 0 14px 40px rgba(0,0,0,.15);
            backdrop-filter: blur(16px);
        }
        .metric-card { padding: 1.15rem 1.25rem; min-height: 124px; }
        .metric-label { color: var(--muted); font-size: .78rem; text-transform: uppercase; letter-spacing:.08em; }
        .metric-value { color: var(--text); font-size: 2rem; font-weight: 800; letter-spacing:-.04em; margin-top:.36rem; }
        .metric-note { color: #7F8CAA; font-size:.78rem; margin-top:.2rem; }
        .glass-card { padding: 1.2rem 1.35rem; }
        .section-kicker { color: var(--cyan); font-size:.76rem; letter-spacing:.12em; text-transform:uppercase; font-weight:700; }
        .section-title { font-size:1.45rem; font-weight:750; margin:.25rem 0 .8rem; letter-spacing:-.025em; }

        .prediction-card { padding:1.6rem; text-align:center; position:relative; overflow:hidden; }
        .prediction-card:before { content:''; position:absolute; inset:0; background:linear-gradient(145deg, rgba(69,224,193,.08), transparent 45%, rgba(167,139,250,.08)); pointer-events:none; }
        .drug-name { font-size:3.1rem; font-weight:850; letter-spacing:-.06em; margin:.2rem 0; }
        .confidence { color:var(--muted); }
        .status-good { color:#45E0C1; font-weight:650; }
        .status-warn { color:#FFB86B; font-weight:650; }

        .decision-step { display:flex; align-items:center; gap:.7rem; margin:.55rem 0; padding:.65rem .75rem; background:rgba(255,255,255,.035); border-radius:12px; border:1px solid rgba(154,174,255,.10); }
        .step-number { display:grid; place-items:center; min-width:26px; height:26px; border-radius:50%; background:rgba(69,224,193,.15); color:#45E0C1; font-size:.75rem; font-weight:800; }
        .notice { padding:.85rem 1rem; border-radius:14px; background:rgba(255,184,107,.08); border:1px solid rgba(255,184,107,.18); color:#D8C3A5; font-size:.82rem; line-height:1.6; }
        .model-pill { display:inline-flex; align-items:center; gap:.4rem; padding:.42rem .7rem; margin:.2rem; border-radius:999px; background:rgba(69,224,193,.08); border:1px solid rgba(69,224,193,.18); color:#CFF8EE; font-size:.8rem; }

        div[data-testid="stMetric"] { background: var(--panel); border:1px solid var(--border); padding:1rem; border-radius:18px; }
        div[data-testid="stMetricLabel"] { color:var(--muted); }
        div[data-testid="stMetricValue"] { color:var(--text); }
        .stTabs [data-baseweb="tab-list"] { gap:.5rem; background:rgba(18,25,48,.45); border:1px solid var(--border); border-radius:16px; padding:.35rem; }
        .stTabs [data-baseweb="tab"] { border-radius:12px; padding:.55rem 1rem; color:#AAB5D0; }
        .stTabs [aria-selected="true"] { background:rgba(69,224,193,.11) !important; color:#E9FFFA !important; }
        .stButton > button { width:100%; border-radius:12px; border:1px solid rgba(69,224,193,.28); background:linear-gradient(90deg, rgba(69,224,193,.16), rgba(167,139,250,.15)); color:white; font-weight:700; }
        .stButton > button:hover { border-color:#45E0C1; color:white; }
        [data-testid="stDataFrame"] { border:1px solid var(--border); border-radius:14px; overflow:hidden; }
        </style>
        """,
        unsafe_allow_html=True,
    )


# -----------------------------------------------------------------------------
# Data and models
# -----------------------------------------------------------------------------
@st.cache_data(show_spinner=False)
def load_data() -> pd.DataFrame:
    if not DATA_PATH.exists():
        raise FileNotFoundError(f"Dataset not found: {DATA_PATH}")
    df = pd.read_csv(DATA_PATH)
    required = {"Age", "Sex", "BP", "Cholesterol", "Na", "K", "Drug"}
    missing = required.difference(df.columns)
    if missing:
        raise ValueError(f"Missing columns: {', '.join(sorted(missing))}")
    if (df["K"] <= 0).any():
        raise ValueError("K values must be greater than zero.")
    df = df.copy()
    df["Na_K"] = df["Na"] / df["K"]
    df["Sex_code"] = df["Sex"].map({"F": 0, "M": 1})
    df["BP_code"] = df["BP"].map({"LOW": 0, "NORMAL": 1, "HIGH": 2})
    df["Cholesterol_code"] = df["Cholesterol"].map({"NORMAL": 0, "HIGH": 1})
    return df


def model_templates() -> dict[str, Any]:
    return {
        "Decision Tree": DecisionTreeClassifier(max_depth=5, min_samples_leaf=2, random_state=42),
        "Logistic Regression": Pipeline(
            [
                ("scale", StandardScaler()),
                ("model", LogisticRegression(max_iter=4000, C=2.0, random_state=42)),
            ]
        ),
        "Random Forest": RandomForestClassifier(
            n_estimators=350,
            max_depth=7,
            min_samples_leaf=2,
            class_weight="balanced_subsample",
            random_state=42,
        ),
    }


@st.cache_resource(show_spinner=False)
def train_models(df: pd.DataFrame) -> dict[str, Any]:
    X = df[FEATURES]
    y = df["Drug"]
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.20, random_state=42, stratify=y
    )
    cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

    trained: dict[str, Any] = {}
    rows: list[dict[str, Any]] = []
    predictions: dict[str, np.ndarray] = {}

    for name, template in model_templates().items():
        scores = cross_validate(
            clone(template), X, y, cv=cv,
            scoring={"accuracy": "accuracy", "f1": "f1_macro"},
            n_jobs=None,
        )
        model = clone(template).fit(X_train, y_train)
        pred = model.predict(X_test)
        predictions[name] = pred
        rows.append(
            {
                "Model": name,
                "Test accuracy": accuracy_score(y_test, pred),
                "Test macro F1": f1_score(y_test, pred, average="macro"),
                "CV accuracy": scores["test_accuracy"].mean(),
                "CV std": scores["test_accuracy"].std(),
                "CV macro F1": scores["test_f1"].mean(),
            }
        )
        # Refit on all data for live predictions.
        trained[name] = clone(template).fit(X, y)

    metrics = pd.DataFrame(rows).sort_values("CV macro F1", ascending=False).reset_index(drop=True)
    best_name = metrics.iloc[0]["Model"]
    return {
        "models": trained,
        "metrics": metrics,
        "best_name": best_name,
        "X_test": X_test,
        "y_test": y_test,
        "predictions": predictions,
    }


def make_patient(age: int, sex: str, bp: str, cholesterol: str, na_k: float) -> pd.DataFrame:
    return pd.DataFrame(
        [{
            "Age": age,
            "Sex_code": {"F": 0, "M": 1}[sex],
            "BP_code": {"LOW": 0, "NORMAL": 1, "HIGH": 2}[bp],
            "Cholesterol_code": {"NORMAL": 0, "HIGH": 1}[cholesterol],
            "Na_K": na_k,
        }]
    )[FEATURES]


def predict_all(models: dict[str, Any], patient: pd.DataFrame) -> pd.DataFrame:
    rows = []
    for name, model in models.items():
        label = model.predict(patient)[0]
        if hasattr(model, "predict_proba"):
            proba = model.predict_proba(patient)[0]
            classes = list(model.classes_)
            confidence = float(proba[classes.index(label)])
        else:
            confidence = np.nan
        rows.append({"Model": name, "Prediction": label, "Confidence": confidence})
    return pd.DataFrame(rows)


def probabilities_for(model: Any, patient: pd.DataFrame) -> pd.DataFrame:
    probs = model.predict_proba(patient)[0]
    result = pd.DataFrame({"Drug": model.classes_, "Probability": probs})
    result["Drug"] = pd.Categorical(result["Drug"], categories=DRUG_ORDER, ordered=True)
    return result.sort_values("Drug")


def tree_decision_path(model: DecisionTreeClassifier, patient: pd.DataFrame) -> list[str]:
    tree = model.tree_
    node_indicator = model.decision_path(patient)
    leaf_id = model.apply(patient)[0]
    values = patient.iloc[0]
    steps: list[str] = []
    for node_id in node_indicator.indices:
        if node_id == leaf_id:
            continue
        feature_index = tree.feature[node_id]
        threshold = tree.threshold[node_id]
        feature = FEATURES[feature_index]
        value = float(values[feature])
        operator = "≤" if value <= threshold else ">"
        steps.append(
            f"{DISPLAY_FEATURES[feature]} = {value:.2f}  {operator}  {threshold:.2f}"
        )
    return steps


def nearest_patients(df: pd.DataFrame, patient: pd.DataFrame, n: int = 5) -> pd.DataFrame:
    numeric = ["Age", "Na_K"]
    std = df[numeric].std().replace(0, 1)
    distance = ((df[numeric] - patient.iloc[0][numeric]) / std).pow(2).sum(axis=1)
    distance += (df["Sex_code"] != patient.iloc[0]["Sex_code"]).astype(float) * 0.55
    distance += (df["BP_code"] != patient.iloc[0]["BP_code"]).astype(float) * 0.85
    distance += (df["Cholesterol_code"] != patient.iloc[0]["Cholesterol_code"]).astype(float) * 0.65
    out = df.assign(Similarity=(1 / (1 + np.sqrt(distance))) * 100).nlargest(n, "Similarity")
    return out[["Age", "Sex", "BP", "Cholesterol", "Na_K", "Drug", "Similarity"]].round({"Na_K": 2, "Similarity": 1})


def feature_importance_frame(model: Any) -> pd.DataFrame:
    if hasattr(model, "feature_importances_"):
        values = model.feature_importances_
    elif isinstance(model, Pipeline):
        values = np.abs(model.named_steps["model"].coef_).mean(axis=0)
    else:
        values = np.zeros(len(FEATURES))
    return pd.DataFrame(
        {"Feature": [DISPLAY_FEATURES[f] for f in FEATURES], "Importance": values}
    ).sort_values("Importance", ascending=True)


def metric_card(label: str, value: str, note: str) -> None:
    st.markdown(
        f"""
        <div class="metric-card">
            <div class="metric-label">{label}</div>
            <div class="metric-value">{value}</div>
            <div class="metric-note">{note}</div>
        </div>
        """,
        unsafe_allow_html=True,
    )


def plotly_layout(fig: go.Figure, height: int = 380) -> go.Figure:
    fig.update_layout(
        height=height,
        margin=dict(l=10, r=10, t=45, b=10),
        paper_bgcolor="rgba(0,0,0,0)",
        plot_bgcolor="rgba(0,0,0,0)",
        font=dict(color="#C9D2EA", family="Inter"),
        title_font=dict(size=16, color="#F5F7FF"),
        legend=dict(bgcolor="rgba(0,0,0,0)"),
    )
    fig.update_xaxes(gridcolor="rgba(154,174,255,.08)", zeroline=False)
    fig.update_yaxes(gridcolor="rgba(154,174,255,.08)", zeroline=False)
    return fig


# -----------------------------------------------------------------------------
# Views
# -----------------------------------------------------------------------------
def hero() -> None:
    st.markdown(
        """
        <div class="hero">
            <div class="eyebrow">Interactive Explainable AI Lab</div>
            <h1><span class="gradient-text">DrugLens AI</span></h1>
            <p>Explore patterns, simulate an anonymous patient profile, compare machine-learning models, and inspect how each prediction changes.</p>
            <div class="hero-badges">
                <span class="badge">Live predictions</span>
                <span class="badge">What-if simulation</span>
                <span class="badge">Decision path</span>
                <span class="badge">Model duel</span>
            </div>
        </div>
        """,
        unsafe_allow_html=True,
    )


def overview(df: pd.DataFrame, bundle: dict[str, Any]) -> None:
    metrics = bundle["metrics"]
    best = metrics.iloc[0]
    c1, c2, c3, c4 = st.columns(4)
    with c1:
        metric_card("Dataset", f"{len(df):,}", "anonymous records")
    with c2:
        metric_card("Target classes", str(df["Drug"].nunique()), "drug categories")
    with c3:
        metric_card("Best CV F1", f"{best['CV macro F1']:.1%}", str(best["Model"]))
    with c4:
        metric_card("Missing values", str(int(df.isna().sum().sum())), "clean input table")

    st.write("")
    left, right = st.columns([1.15, 1])
    with left:
        counts = df["Drug"].value_counts().reindex(DRUG_ORDER).reset_index()
        counts.columns = ["Drug", "Count"]
        fig = px.bar(
            counts,
            x="Drug", y="Count", color="Drug",
            color_discrete_map=DRUG_COLORS,
            title="Class landscape",
            text_auto=True,
        )
        fig.update_traces(marker_line_width=0, textposition="outside")
        fig.update_layout(showlegend=False)
        st.plotly_chart(plotly_layout(fig), use_container_width=True)
    with right:
        fig = px.scatter(
            df, x="Age", y="Na_K", color="Drug", symbol="BP",
            color_discrete_map=DRUG_COLORS,
            hover_data=["Sex", "Cholesterol"],
            title="Patient feature map",
        )
        fig.update_traces(marker=dict(size=9, opacity=.78, line=dict(width=.4, color="rgba(255,255,255,.35)")))
        st.plotly_chart(plotly_layout(fig), use_container_width=True)

    st.markdown('<div class="section-kicker">Signal scan</div><div class="section-title">What stands out in the data?</div>', unsafe_allow_html=True)
    i1, i2, i3 = st.columns(3)
    dominant = df["Drug"].value_counts(normalize=True).iloc[0]
    median_ratio = df["Na_K"].median()
    strongest_bp = pd.crosstab(df["BP"], df["Drug"], normalize="index").max(axis=1).idxmax()
    with i1:
        st.info(f"**Class imbalance:** the largest class represents {dominant:.0%} of all records.")
    with i2:
        st.info(f"**Na/K center:** the median ratio is {median_ratio:.2f}.")
    with i3:
        st.info(f"**Most concentrated BP group:** {strongest_bp} shows the clearest dominant class pattern.")


def patient_lab(df: pd.DataFrame, bundle: dict[str, Any]) -> None:
    models = bundle["models"]
    best_name = bundle["best_name"]

    st.markdown('<div class="section-kicker">Patient simulator</div><div class="section-title">Build a profile and watch the models react</div>', unsafe_allow_html=True)
    left, right = st.columns([.82, 1.18], gap="large")
    with left:
        with st.container(border=True):
            age = st.slider("Age", int(df["Age"].min()), int(df["Age"].max()), int(df["Age"].median()))
            sex = st.radio("Sex", options=["F", "M"], index=0, horizontal=True)
            bp = st.select_slider("Blood pressure", options=["LOW", "NORMAL", "HIGH"], value="NORMAL")
            cholesterol = st.radio("Cholesterol", options=["NORMAL", "HIGH"], index=0, horizontal=True)
            na_k = st.slider(
                "Na/K ratio", float(df["Na_K"].min()), float(df["Na_K"].max()),
                float(df["Na_K"].median()), step=0.1,
            )
            st.caption("The original Na and K columns are transformed into their ratio, matching the project feature engineering.")

        patient = make_patient(age, sex, bp, cholesterol, na_k)
        duel = predict_all(models, patient)
        agreed = duel["Prediction"].nunique() == 1
        prediction = models[best_name].predict(patient)[0]
        probs = probabilities_for(models[best_name], patient)
        confidence = float(probs.loc[probs["Drug"] == prediction, "Probability"].iloc[0])

        agreement_text = "All models agree" if agreed else "Models disagree"
        agreement_class = "status-good" if agreed else "status-warn"
        with right:
            st.markdown(
                f"""
                <div class="prediction-card">
                    <div class="metric-label">Top prediction · {best_name}</div>
                    <div class="drug-name" style="color:{DRUG_COLORS.get(prediction, '#45E0C1')}">{prediction}</div>
                    <div class="confidence">Model confidence: <strong>{confidence:.1%}</strong></div>
                    <div class="{agreement_class}" style="margin-top:.55rem">{agreement_text}</div>
                </div>
                """,
                unsafe_allow_html=True,
            )

            gauge = go.Figure(go.Indicator(
                mode="gauge+number",
                value=confidence * 100,
                number={"suffix": "%", "font": {"color": "#F5F7FF", "size": 35}},
                title={"text": "Prediction confidence", "font": {"color": "#9CA9C8", "size": 14}},
                gauge={
                    "axis": {"range": [0, 100], "tickcolor": "#7F8CAA"},
                    "bar": {"color": DRUG_COLORS.get(prediction, "#45E0C1")},
                    "bgcolor": "rgba(255,255,255,.04)",
                    "borderwidth": 0,
                    "steps": [
                        {"range": [0, 55], "color": "rgba(255,107,158,.10)"},
                        {"range": [55, 80], "color": "rgba(255,184,107,.10)"},
                        {"range": [80, 100], "color": "rgba(69,224,193,.10)"},
                    ],
                },
            ))
            gauge.update_layout(height=270, margin=dict(l=25, r=25, t=55, b=10), paper_bgcolor="rgba(0,0,0,0)")
            st.plotly_chart(gauge, use_container_width=True)

    p1, p2 = st.columns([1, 1])
    with p1:
        fig = px.bar(
            probs, x="Probability", y="Drug", orientation="h", color="Drug",
            color_discrete_map=DRUG_COLORS, text=probs["Probability"].map(lambda x: f"{x:.1%}"),
            title=f"Class probability · {best_name}",
        )
        fig.update_layout(showlegend=False, xaxis_tickformat=".0%")
        fig.update_traces(textposition="outside")
        st.plotly_chart(plotly_layout(fig, 350), use_container_width=True)
    with p2:
        duel_display = duel.copy()
        duel_display["Confidence"] = duel_display["Confidence"].map(lambda x: f"{x:.1%}")
        st.markdown('<div class="glass-card"><div class="section-kicker">Model duel</div><div class="section-title">Three opinions, one profile</div>', unsafe_allow_html=True)
        for _, row in duel_display.iterrows():
            st.markdown(
                f'<span class="model-pill"><strong>{row["Model"]}</strong>&nbsp;→&nbsp;{row["Prediction"]} · {row["Confidence"]}</span>',
                unsafe_allow_html=True,
            )
        st.markdown('</div>', unsafe_allow_html=True)

    d1, d2 = st.columns([1, 1])
    with d1:
        st.markdown('<div class="section-kicker">Explainability</div><div class="section-title">Decision-tree path</div>', unsafe_allow_html=True)
        tree = models["Decision Tree"]
        steps = tree_decision_path(tree, patient)
        for idx, step in enumerate(steps, start=1):
            st.markdown(f'<div class="decision-step"><span class="step-number">{idx}</span><span>{step}</span></div>', unsafe_allow_html=True)
        tree_prediction = tree.predict(patient)[0]
        st.success(f"Leaf result: {tree_prediction}")
    with d2:
        st.markdown('<div class="section-kicker">Case retrieval</div><div class="section-title">Closest historical profiles</div>', unsafe_allow_html=True)
        st.dataframe(nearest_patients(df, patient), hide_index=True, use_container_width=True)

    st.markdown('<div class="notice">Educational machine-learning demo only. It does not diagnose, prescribe, or replace clinical judgment.</div>', unsafe_allow_html=True)


def what_if_lab(df: pd.DataFrame, bundle: dict[str, Any]) -> None:
    models = bundle["models"]
    st.markdown('<div class="section-kicker">What-if lab</div><div class="section-title">Find where the prediction changes</div>', unsafe_allow_html=True)

    a, b, c, d = st.columns(4)
    with a:
        base_age = st.slider("Base age", int(df.Age.min()), int(df.Age.max()), 40, key="what_age")
    with b:
        base_sex = st.selectbox("Sex", ["F", "M"], key="what_sex")
    with c:
        base_bp = st.selectbox("Blood pressure", ["LOW", "NORMAL", "HIGH"], index=1, key="what_bp")
    with d:
        base_chol = st.selectbox("Cholesterol", ["NORMAL", "HIGH"], key="what_chol")

    model_name = st.radio("Model", list(models), horizontal=True)
    model = models[model_name]
    ratio_grid = np.linspace(float(df.Na_K.min()), float(df.Na_K.max()), 160)
    grid = pd.concat(
        [make_patient(base_age, base_sex, base_bp, base_chol, float(r)) for r in ratio_grid],
        ignore_index=True,
    )
    pred = model.predict(grid)
    prob = model.predict_proba(grid).max(axis=1)
    scan = pd.DataFrame({"Na/K ratio": ratio_grid, "Prediction": pred, "Confidence": prob})

    fig = px.scatter(
        scan, x="Na/K ratio", y="Confidence", color="Prediction",
        color_discrete_map=DRUG_COLORS,
        title=f"Prediction transitions across Na/K · {model_name}",
    )
    fig.update_traces(marker=dict(size=7, opacity=.82))
    fig.update_layout(yaxis_tickformat=".0%")
    st.plotly_chart(plotly_layout(fig, 420), use_container_width=True)

    transitions = scan.loc[scan["Prediction"].ne(scan["Prediction"].shift())].copy()
    transitions["Confidence"] = transitions["Confidence"].map(lambda x: f"{x:.1%}")
    transitions["Na/K ratio"] = transitions["Na/K ratio"].round(2)
    st.markdown("#### Transition points")
    st.dataframe(transitions, hide_index=True, use_container_width=True)


def model_arena(df: pd.DataFrame, bundle: dict[str, Any]) -> None:
    st.markdown('<div class="section-kicker">Model arena</div><div class="section-title">Performance, stability, and interpretability</div>', unsafe_allow_html=True)
    metrics = bundle["metrics"].copy()
    display = metrics.copy()
    for col in ["Test accuracy", "Test macro F1", "CV accuracy", "CV macro F1"]:
        display[col] = display[col].map(lambda x: f"{x:.1%}")
    display["CV std"] = display["CV std"].map(lambda x: f"±{x:.2%}")
    st.dataframe(display, hide_index=True, use_container_width=True)

    selected = st.selectbox("Inspect model", metrics["Model"].tolist())
    model = bundle["models"][selected]
    pred = bundle["predictions"][selected]
    y_test = bundle["y_test"]

    left, right = st.columns([1, 1])
    with left:
        cm = confusion_matrix(y_test, pred, labels=DRUG_ORDER)
        fig = px.imshow(
            cm, x=DRUG_ORDER, y=DRUG_ORDER, text_auto=True,
            labels=dict(x="Predicted", y="Actual", color="Count"),
            title=f"Confusion matrix · {selected}",
            color_continuous_scale=[[0, "#111A34"], [1, "#45E0C1"]],
        )
        st.plotly_chart(plotly_layout(fig, 430), use_container_width=True)
    with right:
        importance = feature_importance_frame(model)
        fig = px.bar(
            importance, x="Importance", y="Feature", orientation="h",
            title=f"Global feature influence · {selected}",
        )
        fig.update_traces(marker_color="#A78BFA")
        st.plotly_chart(plotly_layout(fig, 430), use_container_width=True)

    st.caption("Cross-validation is stratified and uses five shuffled folds. The holdout test split is 20% and stratified by drug class.")


def data_explorer(df: pd.DataFrame) -> None:
    st.markdown('<div class="section-kicker">Data explorer</div><div class="section-title">Slice the dataset without touching code</div>', unsafe_allow_html=True)
    f1, f2, f3, f4 = st.columns(4)
    with f1:
        drugs = st.multiselect("Drug", DRUG_ORDER, default=DRUG_ORDER)
    with f2:
        sex = st.multiselect("Sex", sorted(df.Sex.unique()), default=sorted(df.Sex.unique()))
    with f3:
        bp = st.multiselect("Blood pressure", ["LOW", "NORMAL", "HIGH"], default=["LOW", "NORMAL", "HIGH"])
    with f4:
        chol = st.multiselect("Cholesterol", ["NORMAL", "HIGH"], default=["NORMAL", "HIGH"])

    age_range = st.slider("Age range", int(df.Age.min()), int(df.Age.max()), (int(df.Age.min()), int(df.Age.max())))
    filtered = df[
        df.Drug.isin(drugs)
        & df.Sex.isin(sex)
        & df.BP.isin(bp)
        & df.Cholesterol.isin(chol)
        & df.Age.between(*age_range)
    ]

    c1, c2, c3 = st.columns(3)
    c1.metric("Visible records", len(filtered))
    c2.metric("Average age", f"{filtered.Age.mean():.1f}" if len(filtered) else "—")
    c3.metric("Average Na/K", f"{filtered.Na_K.mean():.2f}" if len(filtered) else "—")

    if filtered.empty:
        st.warning("No records match the selected filters.")
        return

    left, right = st.columns(2)
    with left:
        fig = px.box(filtered, x="Drug", y="Age", color="Drug", color_discrete_map=DRUG_COLORS, title="Age by class")
        fig.update_layout(showlegend=False)
        st.plotly_chart(plotly_layout(fig), use_container_width=True)
    with right:
        grouped = filtered.groupby(["BP", "Drug"], observed=True).size().reset_index(name="Count")
        fig = px.bar(grouped, x="BP", y="Count", color="Drug", barmode="group", color_discrete_map=DRUG_COLORS, title="Drug classes across blood pressure")
        st.plotly_chart(plotly_layout(fig), use_container_width=True)

    show_cols = ["Age", "Sex", "BP", "Cholesterol", "Na", "K", "Na_K", "Drug"]
    st.dataframe(filtered[show_cols].round(3), hide_index=True, use_container_width=True)
    st.download_button(
        "Download filtered CSV",
        data=filtered[show_cols].to_csv(index=False).encode("utf-8"),
        file_name="druglens_filtered_data.csv",
        mime="text/csv",
    )


def sidebar(bundle: dict[str, Any]) -> str:
    with st.sidebar:
        st.markdown("## 🧬 DrugLens AI")
        st.caption("Explainable classification studio")
        st.divider()
        page = st.radio(
            "Navigate",
            ["Overview", "Patient Lab", "What-if Lab", "Model Arena", "Data Explorer"],
            label_visibility="collapsed",
        )
        st.divider()
        st.markdown("**Active champion**")
        st.success(bundle["best_name"])
        st.caption("Selected by mean 5-fold macro F1.")
        st.divider()
        st.caption("Built with Streamlit · Plotly · scikit-learn")
    return page


def main() -> None:
    inject_css()
    try:
        df = load_data()
        bundle = train_models(df)
    except Exception as exc:
        st.error(f"Unable to initialize the dashboard: {exc}")
        st.stop()

    page = sidebar(bundle)
    hero()

    if page == "Overview":
        overview(df, bundle)
    elif page == "Patient Lab":
        patient_lab(df, bundle)
    elif page == "What-if Lab":
        what_if_lab(df, bundle)
    elif page == "Model Arena":
        model_arena(df, bundle)
    else:
        data_explorer(df)


if __name__ == "__main__":
    main()
