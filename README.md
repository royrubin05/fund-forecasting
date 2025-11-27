# Fund Forecasting Tool

A comprehensive venture fund forecasting application built with Next.js, Tailwind CSS, and Recharts.

## 🚀 Getting Started

### Prerequisites
- **Node.js**: Ensure you have Node.js installed (v18 or higher recommended).
- **npm**: Comes with Node.js.

### Installation

1.  **Navigate to the project directory**:
    ```bash
    cd fund-forecasting-tool
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```
    *This will install Next.js, React, Tailwind, Recharts, and TanStack Table.*

### Running the Application

**Option 1: Development Mode (Recommended for editing)**
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000). The app will auto-reload if you make changes.

**Option 2: Production Mode (Best for demoing)**
To simulate a real deployment locally:
```bash
npm run build
npm start
```
Visit [http://localhost:3000](http://localhost:3000). This runs the optimized production build.

## 🧪 How to Test

### 1. Automated Test Suite (Recommended)
We have added a comprehensive test suite to verify the financial engine's accuracy, including the new "Realized vs. Unrealized" logic.

Run the full suite:
```bash
npm test
```

### 2. Manual Verification Guide

Once the app is running (`npm run dev`), try these specific workflows to verify 1:1 parity:

#### A. The "Partial Exit" Test (Realized vs. Unrealized)
1.  Go to the **Portfolio** tab.
2.  Add a new investment.
3.  Set **Realized Multiple** to `1.0` (Cost returned).
4.  Set **Unrealized Multiple** to `2.0` (Remaining value).
5.  **Verify**: The **TVPI** column should show `3.00x`.

#### B. The "Scenario Swap" Test
1.  Change **Fund Size** to `$100M`.
2.  Type "Big Fund" in the Scenario box and click **Save**.
3.  Click the **Reset** icon (counter-clockwise arrow). Fund Size should revert to $50M.
4.  Click "Big Fund" in the saved list.
5.  **Verify**: Fund Size jumps back to `$100M` and all charts update instantly.

#### C. The "J-Curve" Visualization
1.  Go to the **Overview** tab.
2.  **Verify**: You see a **Composed Chart** with:
    - **Blue Bars**: Annual Net Cash Flow.
    - **Green Line**: Cumulative Distributions.
    - **Red Line**: Cumulative Capital Called.

