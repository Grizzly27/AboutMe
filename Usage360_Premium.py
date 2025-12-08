"""
PREMIUM USAGE ANALYTICS PLATFORM
A $100M-tier design with Prudential Blue & White theme
iTunes-level simplicity with enterprise functionality
"""

import os
import pandas as pd
import numpy as np
import streamlit as st
import plotly.express as px
from datetime import datetime
from typing import Optional, Tuple

# ======================================================================
# CONFIGURATION
# ======================================================================

HISTORICAL_PATH = r"C:\Users\...\Historical-MergedUsage.csv"

COLUMN_RENAME_MAP = {
    "ReportName": "ReportPage",
    "PageViews": "ViewsCount",
    "SectionName": "DisplayName",
    "UniqueUsers": "UserPrincipalName",
}

# ======================================================================
# PREMIUM STYLING (Prudential Blue #003D7A + White)
# ======================================================================

st.set_page_config(
    page_title="Usage Analytics",
    page_icon="📊",
    layout="wide",
    initial_sidebar_state="collapsed"
)

st.markdown("""
<style>
    /* Global Reset */
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    html, body, [data-testid="stAppViewContainer"] {
        background-color: #FFFFFF;
        font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
        color: #1D1D1D;
    }
    
    [data-testid="stMainBlockContainer"] { padding: 0; background: white; }
    
    /* Typography */
    h1 { font-size: 48px; font-weight: 700; letter-spacing: -0.5px; color: #003D7A; margin-bottom: 8px; }
    h2 { font-size: 32px; font-weight: 600; color: #003D7A; margin: 32px 0 16px 0; }
    h3 { font-size: 24px; font-weight: 500; color: #003D7A; }
    
    /* Hero */
    .hero-section {
        background: linear-gradient(135deg, #003D7A 0%, #0052A3 100%);
        color: white; padding: 48px 40px; margin: 0; text-align: center;
    }
    .hero-title { font-size: 56px; font-weight: 700; margin: 0 0 12px 0; letter-spacing: -1px; }
    .hero-subtitle { font-size: 18px; font-weight: 400; opacity: 0.95; line-height: 1.6; }
    
    /* Cards */
    .premium-card {
        background: white; border: 1px solid #E5E5EA; border-radius: 12px;
        padding: 24px; margin-bottom: 16px;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    }
    .premium-card:hover {
        box-shadow: 0 8px 24px rgba(0, 61, 122, 0.12);
        border-color: #003D7A;
    }
    
    /* Step Progress */
    .step-dot {
        width: 44px; height: 44px; border-radius: 50%;
        background: #E5E5EA; color: #999; display: flex;
        align-items: center; justify-content: center;
        font-weight: 600; transition: all 0.3s ease;
    }
    .step-dot.active {
        background: #003D7A; color: white;
        box-shadow: 0 4px 12px rgba(0, 61, 122, 0.3);
    }
    .step-dot.completed { background: #34C759; color: white; }
    
    /* Buttons */
    .stButton > button {
        background-color: #003D7A; color: white; border: none;
        border-radius: 8px; padding: 12px 24px; font-size: 16px;
        font-weight: 500; width: 100%;
        transition: all 0.2s ease;
    }
    .stButton > button:hover {
        background-color: #0052A3;
        box-shadow: 0 4px 12px rgba(0, 61, 122, 0.3);
        transform: translateY(-1px);
    }
    
    /* Inputs */
    .stTextInput > div > div > input,
    .stNumberInput > div > div > input {
        border: 1px solid #D1D1D6; border-radius: 8px;
        padding: 12px 16px; font-size: 15px;
        transition: all 0.2s ease;
    }
    .stTextInput > div > div > input:focus,
    .stNumberInput > div > div > input:focus {
        border-color: #003D7A;
        box-shadow: 0 0 0 3px rgba(0, 61, 122, 0.1);
    }
    
    /* Sliders */
    .stSlider > div > div > div > div { background-color: #003D7A !important; }
    
    /* Checkboxes */
    .stCheckbox > label > div { border-color: #D1D1D6 !important; }
    .stCheckbox > label > div > svg { fill: #003D7A !important; }
    
    /* Tabs */
    .stTabs [data-baseweb="tab-list"] button { font-weight: 500; color: #666; }
    .stTabs [data-baseweb="tab-list"] button[aria-selected="true"] {
        color: #003D7A; border-bottom-color: #003D7A;
    }
    
    /* Data Grid */
    .stDataFrame { border-radius: 8px; overflow: hidden; }
    
    /* Messages */
    .stSuccess, .stInfo, .stWarning, .stError { border-radius: 8px; }
    .stSuccess, .stInfo {
        background-color: #F0F9FF !important;
        border-color: #0052A3 !important;
        color: #003D7A !important;
    }
    
    /* Metric Cards */
    .metric-card {
        background: linear-gradient(135deg, #F8FBFF 0%, #E8F0FF 100%);
        border: 1px solid #D1D1D6; border-radius: 12px;
        padding: 20px; text-align: center;
    }
    .metric-value { font-size: 32px; font-weight: 700; color: #003D7A; }
    .metric-label { font-size: 13px; color: #666; margin-top: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
</style>
""", unsafe_allow_html=True)

# ======================================================================
# UTILITIES (All original logic preserved)
# ======================================================================

def to_lower(s: str) -> str:
    return s.lower().strip() if isinstance(s, str) else s

def find_col(df: pd.DataFrame, candidates: set) -> Optional[str]:
    cols = {c.lower(): c for c in df.columns}
    for cand in candidates:
        if cand.lower() in cols:
            return cols[cand.lower()]
    return None

def detect_date_col(df: pd.DataFrame) -> Optional[str]:
    return find_col(df, {"usageDate", "createddate", "timestamp", "day", "eventdate", "viewdate"})

def detect_views_col(df: pd.DataFrame) -> Optional[str]:
    return find_col(df, {"views", "viewscount", "viewcount", "totalviews"})

def detect_reportpage_col(df: pd.DataFrame) -> Optional[str]:
    return find_col(df, {"reportpage", "reportname", "pagename", "tabname"})

def date_range_for(df: pd.DataFrame) -> Optional[Tuple[str, str]]:
    col = detect_date_col(df)
    if col is None:
        return None
    s = pd.to_datetime(df[col], errors="coerce")
    s = s.dropna()
    if s.empty:
        return None
    return (s.min().date().isoformat(), s.max().date().isoformat())

@st.cache_data(show_spinner=False)
def load_csv(path: str) -> pd.DataFrame:
    return pd.read_csv(path)

@st.cache_data(show_spinner=False)
def load_excel(path: str) -> pd.DataFrame:
    return pd.read_excel(path)

def list_excel_files(folder_path: str) -> list[str]:
    return [
        os.path.join(folder_path, f)
        for f in sorted(os.listdir(folder_path))
        if f.lower().endswith((".xlsx", ".xls"))
    ]

def standardize_columns(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()
    rename_subset = {src: dst for src, dst in COLUMN_RENAME_MAP.items()
                     if src in df.columns}
    if rename_subset:
        df.rename(columns=rename_subset, inplace=True)

    if "DisplayName" not in df.columns:
        for alt in ["SectionName", "ReportName", "Report", "Report Title", "Page", "PageName"]:
            if alt in df.columns:
                df["DisplayName"] = df[alt]
                break

    if "ViewsCount" not in df.columns:
        for alt in ["Views", "ViewCount"]:
            if alt in df.columns:
                df["ViewsCount"] = df[alt]
                break

    if "ViewsCount" in df.columns:
        df["ViewsCount"] = pd.to_numeric(df["ViewsCount"], errors="coerce")

    return df

def add_metadata_cols(df: pd.DataFrame, source_file: str, ingest_date: str) -> pd.DataFrame:
    df = df.copy()
    df["SourceFileName"] = os.path.basename(source_file)
    df["IngestedAt"] = ingest_date
    return df

def build_suspect_mask(combined_all: pd.DataFrame,
                       title_col: str,
                       page_col: str,
                       length_threshold: int,
                       token_threshold: int) -> pd.Series:
    """Original anomaly detection logic - preserved exactly."""
    t_series = combined_all[title_col].astype(str)
    p_series = combined_all[page_col].astype(str)

    t_len = t_series.str.len()
    p_len = p_series.str.len()

    t_tokens = t_series.str.split().str.len()
    p_tokens = p_series.str.split().str.len()

    length_gap = p_len - t_len
    token_gap = p_tokens - t_tokens

    length_mask = length_gap >= length_threshold
    token_mask = token_gap >= token_threshold

    suspect_mask = length_mask & token_mask
    return suspect_mask

# ======================================================================
# STEP 1 – PREMIUM FOLDER SELECTION
# ======================================================================

def step1_select_folder_and_load() -> Tuple[Optional[str], Optional[pd.DataFrame]]:
    # Hero
    st.markdown("""
    <div class="hero-section">
        <div class="hero-title">📊 Usage Analytics</div>
        <div class="hero-subtitle">Combine, analyze, and export your data with confidence</div>
    </div>
    """, unsafe_allow_html=True)
    
    st.markdown("<div style='height: 32px;'></div>", unsafe_allow_html=True)
    
    # Step progress
    col1, col2, col3, col4, col5 = st.columns([1, 0.1, 1, 0.1, 1])
    with col1:
        st.markdown("""
        <div style="text-align: center;">
            <div class="step-dot active">1</div>
            <div style='margin-top: 8px; font-size: 12px; color: #003D7A; font-weight: 500;'>Import</div>
        </div>
        """, unsafe_allow_html=True)
    with col2:
        st.markdown("<div style='text-align: center; padding: 8px 0;'>→</div>", unsafe_allow_html=True)
    with col3:
        st.markdown("""
        <div style="text-align: center;">
            <div class="step-dot">2</div>
            <div style='margin-top: 8px; font-size: 12px; color: #999;'>Review</div>
        </div>
        """, unsafe_allow_html=True)
    with col4:
        st.markdown("<div style='text-align: center; padding: 8px 0;'>→</div>", unsafe_allow_html=True)
    with col5:
        st.markdown("""
        <div style="text-align: center;">
            <div class="step-dot">3</div>
            <div style='margin-top: 8px; font-size: 12px; color: #999;'>Export</div>
        </div>
        """, unsafe_allow_html=True)
    
    st.markdown("<div style='height: 40px;'></div>", unsafe_allow_html=True)
    
    # Main card
    st.markdown('<div class="premium-card">', unsafe_allow_html=True)
    st.subheader("📁 Select Your Data Folder")
    
    folder_path = st.text_input(
        "Folder Path",
        placeholder="C:\\Data\\Usage",
        key="folder_path_input",
        help="Paste the folder containing your Excel files. We'll combine all .xlsx/.xls with historical data."
    )
    
    st.markdown('</div>', unsafe_allow_html=True)
    
    # Validation
    if not folder_path:
        st.markdown("""
        <div class="premium-card" style="background: linear-gradient(135deg, #F0F9FF 0%, #E8F0FF 100%); border-color: #0052A3;">
            <strong style="color: #003D7A;">💡 Enter a folder path to begin</strong><br/>
            <span style="font-size: 14px;">We'll automatically detect and combine all Excel files with your historical data.</span>
        </div>
        """, unsafe_allow_html=True)
        return None, None

    if not os.path.isdir(folder_path):
        st.markdown("""
        <div class="premium-card" style="background: #FFF5F5; border-color: #D32F2F;">
            <strong style="color: #D32F2F;">⚠️ Folder not found</strong><br/>
            <span style="font-size: 14px;">Please check the path and ensure it exists.</span>
        </div>
        """, unsafe_allow_html=True)
        return None, None

    excel_files = list_excel_files(folder_path)
    if not excel_files:
        st.markdown("""
        <div class="premium-card" style="background: #FFF5F5; border-color: #D32F2F;">
            <strong style="color: #D32F2F;">ℹ️ No Excel files found</strong><br/>
            <span style="font-size: 14px;">We couldn't find any .xlsx or .xls files in this folder.</span>
        </div>
        """, unsafe_allow_html=True)
        return None, None

    # Load data
    with st.spinner("Loading..."):
        try:
            historical_df = load_csv(HISTORICAL_PATH)
        except Exception as e:
            st.markdown(f"""
            <div class="premium-card" style="background: #FFF5F5; border-color: #D32F2F;">
                <strong style="color: #D32F2F;">❌ Failed to load historical data</strong><br/>
                <span style="font-size: 14px;">{str(e)}</span>
            </div>
            """, unsafe_allow_html=True)
            return None, None

        frames = []
        ingest_ts = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        progress_bar = st.progress(0)
        file_status = st.empty()
        
        for idx, fpath in enumerate(excel_files):
            file_status.text(f"Processing: {os.path.basename(fpath)}")
            try:
                df = load_excel(fpath)
                df = standardize_columns(df)
                df = add_metadata_cols(df, fpath, ingest_ts)
                frames.append(df)
            except Exception as e:
                st.warning(f"Skipped {os.path.basename(fpath)}: {str(e)}")
            
            progress_bar.progress((idx + 1) / len(excel_files))
        
        file_status.empty()
        progress_bar.empty()

        if not frames:
            st.markdown("""
            <div class="premium-card" style="background: #FFF5F5; border-color: #D32F2F;">
                <strong style="color: #D32F2F;">❌ No valid files loaded</strong><br/>
                <span style="font-size: 14px;">Please check file formats and try again.</span>
            </div>
            """, unsafe_allow_html=True)
            return folder_path, None

        new_df = pd.concat(frames, ignore_index=True)
        combined_all = pd.concat([historical_df, new_df], ignore_index=True)

    # Success metrics
    st.markdown("<div style='height: 24px;'></div>", unsafe_allow_html=True)
    
    col1, col2, col3 = st.columns(3)
    with col1:
        st.markdown(f"""
        <div class="metric-card">
            <div class="metric-value">{len(excel_files)}</div>
            <div class="metric-label">Files Loaded</div>
        </div>
        """, unsafe_allow_html=True)
    with col2:
        st.markdown(f"""
        <div class="metric-card">
            <div class="metric-value">{len(combined_all):,}</div>
            <div class="metric-label">Total Rows</div>
        </div>
        """, unsafe_allow_html=True)
    with col3:
        st.markdown(f"""
        <div class="metric-card">
            <div class="metric-value">{len(combined_all.columns)}</div>
            <div class="metric-label">Columns</div>
        </div>
        """, unsafe_allow_html=True)
    
    st.markdown("""
    <div class="premium-card" style="background: linear-gradient(135deg, #F0FFF4 0%, #E0F9F0 100%); border-color: #34C759; text-align: center;">
        <strong style="color: #34C759;">✅ Data loaded successfully</strong>
    </div>
    """, unsafe_allow_html=True)

    return folder_path, combined_all

# ======================================================================
# STEP 2 – PREMIUM PREVIEW
# ======================================================================

def step2_preview(combined_all: pd.DataFrame):
    st.markdown('<div class="premium-card">', unsafe_allow_html=True)
    st.subheader("📋 Data Preview")
    st.dataframe(combined_all.head(50), use_container_width=True, height=400)
    st.markdown('</div>', unsafe_allow_html=True)

# ======================================================================
# STEP 3 – PREMIUM DASHBOARD
# ======================================================================

def step3_dashboard_and_anomaly(combined_all: pd.DataFrame):
    st.markdown("<div style='height: 24px;'></div>", unsafe_allow_html=True)
    st.markdown('<div class="premium-card">', unsafe_allow_html=True)
    st.subheader("🔍 Anomaly Detection")
    
    title_col = "DisplayName"
    page_col = detect_reportpage_col(combined_all) or "ReportPage"

    col1, col2 = st.columns(2)
    with col1:
        length_threshold = st.slider(
            "Length gap threshold (chars)",
            min_value=1, max_value=400, value=100, step=1,
            help="Difference in characters between page and title"
        )
    with col2:
        token_threshold = st.slider(
            "Token gap threshold (words)",
            min_value=1, max_value=45, value=15, step=1,
            help="Difference in word count between page and title"
        )

    suspect_mask = build_suspect_mask(
        combined_all,
        title_col=title_col,
        page_col=page_col,
        length_threshold=length_threshold,
        token_threshold=token_threshold,
    )

    st.session_state["anomaly_cfg"] = {
        "length_threshold": int(length_threshold),
        "token_threshold": int(token_threshold),
        "title_col": title_col,
        "page_col": page_col,
    }

    suspect_count = int(suspect_mask.sum())
    st.markdown(f"""
    <div style="background: linear-gradient(135deg, #F0F9FF 0%, #E8F0FF 100%); border: 1px solid #0052A3; border-radius: 12px; padding: 16px; margin: 16px 0;">
        <strong style="color: #003D7A;">{suspect_count} suspect rows detected</strong>
    </div>
    """, unsafe_allow_html=True)
    
    st.subheader("Suspect Rows")
    st.dataframe(combined_all.loc[suspect_mask].head(50), use_container_width=True)
    st.markdown('</div>', unsafe_allow_html=True)

# ======================================================================
# STEP 4 – PREMIUM EXPORT
# ======================================================================

def step4_export(combined_all: pd.DataFrame):
    st.markdown("<div style='height: 24px;'></div>", unsafe_allow_html=True)
    st.markdown('<div class="premium-card">', unsafe_allow_html=True)
    st.subheader("📤 Export Data")
    
    apply_correction = st.checkbox(
        "Apply swap correction for suspect rows",
        help="Automatically swap columns for rows flagged as anomalies"
    )

    if st.button("Export to CSV", use_container_width=True):
        df_to_write = combined_all.copy()

        try:
            if apply_correction:
                cfg = st.session_state.get("anomaly_cfg", None)
                if cfg is None:
                    st.error("No anomaly configuration found. Please set thresholds above.")
                    return

                t_col = cfg["title_col"]
                p_col = cfg["page_col"]
                length_threshold = cfg["length_threshold"]
                token_threshold = cfg["token_threshold"]

                suspect_mask = build_suspect_mask(
                    df_to_write,
                    title_col=t_col,
                    page_col=p_col,
                    length_threshold=length_threshold,
                    token_threshold=token_threshold,
                )

                swap_count = int(suspect_mask.sum())
                if swap_count > 0:
                    tmp = df_to_write.loc[suspect_mask, t_col].copy()
                    df_to_write.loc[suspect_mask, t_col] = df_to_write.loc[suspect_mask, p_col].values
                    df_to_write.loc[suspect_mask, p_col] = tmp.values

                st.info(f"Applied swap correction to {swap_count} suspect rows.")

            cols_to_drop = [col for col in df_to_write.columns 
                           if col.endswith('_length') or col.endswith('_tokens')]
            if cols_to_drop:
                df_to_write = df_to_write.drop(columns=cols_to_drop)

            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            output_filename = f"Combined_Usage_Export_{timestamp}.csv"
            output_path = os.path.join(os.path.expanduser("~"), "Downloads", output_filename)
            
            df_to_write.to_csv(output_path, index=False)
            
            st.markdown(f"""
            <div style="background: linear-gradient(135deg, #F0FFF4 0%, #E0F9F0 100%); border: 1px solid #34C759; border-radius: 12px; padding: 16px;">
                <strong style="color: #34C759;">✅ Export successful</strong><br/>
                <span style="font-size: 14px;">Saved to: {output_filename}</span><br/>
                <span style="font-size: 14px;"><strong>Total rows:</strong> {len(df_to_write):,}</span>
            </div>
            """, unsafe_allow_html=True)

        except Exception as e:
            st.error(f"Export failed: {e}")
    
    st.markdown('</div>', unsafe_allow_html=True)

# ======================================================================
# MAIN APP
# ======================================================================

def main():
    if "anomaly_cfg" not in st.session_state:
        st.session_state["anomaly_cfg"] = None
    
    folder_path, combined_all = step1_select_folder_and_load()
    
    if combined_all is None:
        st.stop()
    
    step2_preview(combined_all)
    step3_dashboard_and_anomaly(combined_all)
    step4_export(combined_all)

if __name__ == "__main__":
    main()
