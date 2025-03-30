import React, { useState, useEffect } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { useTheme } from '@mui/material';
import { tokens } from '../theme';
import { mockBarData } from '../data/mockData';
import { statBare } from '../APIcons/admin/apisAdmin';

const BarChart = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const response = await statBare();
                
                if (response && response.topBrands) {
                    // Transform the API data to match the format expected by the bar chart
                    const transformedData = response.topBrands.map(brand => ({
                        country: brand.brandName,
                        'hot dog': brand.totalRevenue,
                        revenue: brand.totalRevenue
                    }));
                    setChartData(transformedData);
                } else {
                    setError("Aucune donnée reçue");
                    // Fall back to mock data if no API data is available
                    setChartData(mockBarData);
                }
            } catch (e) {
                setError("Erreur lors de la récupération des données");
                console.error(e);
                // Fall back to mock data in case of error
                setChartData(mockBarData);
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error && chartData.length === 0) {
        return <div>{error}</div>;
    }

    return (
        <ResponsiveBar
            data={chartData}
            theme={{
                axis: {
                    domain: {           
                        line: {
                            stroke: colors.grey[100],
                        },
                    },
                    legend: {
                        text: {
                            fill: colors.grey[100],
                        },
                    },
                    ticks: {
                        line: {
                            stroke: colors.grey[100],
                            strokeWidth: 1,
                        },
                        text: {
                            fill: colors.grey[100],
                        },
                    },
                },
                legends: {
                    text: {
                        fill: colors.grey[100],
                    },
                },
                tooltip: {
                    container: {
                        background: colors.primary[400],
                        color: colors.grey[100],
                        fontSize: '12px',
                    },
                    basic: {
                        whiteSpace: 'pre',
                        display: 'flex',
                        alignItems: 'center',
                    },
                },
            }}
            keys={['hot dog']}
            indexBy="country"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.4}
            innerPadding={1}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            valueFormat={value => `${value.toLocaleString()} €`}
            colors={{ scheme: 'category10' }}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Top 5 marques par revenus',
                legendPosition: 'middle',
                legendOffset: 32,
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Revenu total (€)',
                legendPosition: 'middle',
                legendOffset: -40,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            tooltip={({ id, value, indexValue }) => (
                <div style={{ padding: '8px', background: colors.primary[400] }}>
                    <strong>{indexValue}</strong>
                    <br />
                    {`${id}: ${value.toLocaleString()} €`}
                </div>
            )}
            legends={[
                {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemOpacity: 1,
                            },
                        },
                    ],
                },
            ]}
            role="application"
            ariaLabel="Top 5 marques par revenus"
            barAriaLabel={(e) => `${e.id}: ${e.formattedValue} pour la marque: ${e.indexValue}`}
        />
    );
};

export default BarChart;