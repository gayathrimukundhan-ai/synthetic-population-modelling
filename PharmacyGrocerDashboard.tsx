import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography, Button } from '@mui/material';

function generateSampleCSV() {
  // Sample synthetic data (10 rows)
  const headers = [
    'PatientID', 'Age', 'Gender', 'ZIP', 'HealthCondition', 'MedicationClass'
  ];
  const data = [
    [1001, 45, 'F', '94107', 'Diabetes', 'Biguanides'],
    [1002, 60, 'M', '94110', 'Hypertension', 'ACE Inhibitors'],
    [1003, 34, 'F', '94109', 'Asthma', 'Corticosteroids'],
    [1004, 50, 'M', '94133', 'High Cholesterol', 'Statins'],
    [1005, 29, 'F', '94114', 'None', 'None'],
    [1006, 72, 'M', '94107', 'Diabetes', 'Insulin'],
    [1007, 55, 'F', '94110', 'Hypertension', 'Beta Blockers'],
    [1008, 40, 'M', '94109', 'Asthma', 'Beta Agonists'],
    [1009, 65, 'F', '94133', 'High Cholesterol', 'Statins'],
    [1010, 38, 'M', '94114', 'None', 'None'],
  ];
  let csv = headers.join(',') + '\n';
  data.forEach(row => {
    csv += row.join(',') + '\n';
  });
  return csv;
}

function downloadSampleCSV() {
  const csv = generateSampleCSV();
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'sample_pharmacy_data.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function UploadTab() {
  return (
    <Box p={2}>
      <Typography variant="h6">Upload Pharmacy Data</Typography>
      <Typography variant="body2">Upload a CSV file containing pharmacy data, or <Button size="small" onClick={downloadSampleCSV}>download a sample CSV</Button> to get started.</Typography>
      <Button variant="contained" component="label" sx={{ mt: 2 }}>
        Upload File
        <input type="file" hidden />
      </Button>
    </Box>
  );
}

function DeidentifyTab() {
  return (
    <Box p={2}>
      <Typography variant="h6">Aggregate & De-identify</Typography>
      <Typography variant="body2">Aggregate and de-identify the uploaded data. Confirmation will be shown here.</Typography>
      <Button variant="contained" sx={{ mt: 2 }}>De-identify Data</Button>
    </Box>
  );
}

function AnalyzeTab() {
  return (
    <Box p={2}>
      <Typography variant="h6">Analyze Distributions & Correlations</Typography>
      <Typography variant="body2">Calculate and display statistical distributions and correlations from the de-identified data.</Typography>
      <Button variant="contained" sx={{ mt: 2 }}>Analyze Data</Button>
    </Box>
  );
}

function GenerateTab() {
  return (
    <Box p={2}>
      <Typography variant="h6">Generate Synthetic Population</Typography>
      <Typography variant="body2">Create a synthetic dataset matching the real population’s distributions.</Typography>
      <Button variant="contained" sx={{ mt: 2 }}>Generate Synthetic Data</Button>
    </Box>
  );
}

function ExportTab() {
  return (
    <Box p={2}>
      <Typography variant="h6">Export Synthetic Dataset</Typography>
      <Typography variant="body2">Download the synthetic population dataset and metadata for sharing with the grocery team.</Typography>
      <Button variant="contained" sx={{ mt: 2 }}>Export Data</Button>
    </Box>
  );
}

const PharmacyGrocerDashboard: React.FC = () => {
  const [tab, setTab] = useState(0);
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => setTab(newValue);

  return (
    <Box sx={{ width: '100%', typography: 'body1', mt: 4 }}>
      <Tabs value={tab} onChange={handleTabChange} centered>
        <Tab label="Upload" />
        <Tab label="De-identify" />
        <Tab label="Analyze" />
        <Tab label="Generate" />
        <Tab label="Export" />
      </Tabs>
      <Box sx={{ mt: 2 }}>
        {tab === 0 && <UploadTab />}
        {tab === 1 && <DeidentifyTab />}
        {tab === 2 && <AnalyzeTab />}
        {tab === 3 && <GenerateTab />}
        {tab === 4 && <ExportTab />}
      </Box>
    </Box>
  );
};

export default PharmacyGrocerDashboard;
