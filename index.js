const ctx = document.getElementById('iotCostLineChart').getContext('2d');
const exchangeRate = 5.50;

// Dados convertidos para Reais
const iotCoreData = [0, 0.05, 0.45, 4.55, 22.74].map(value => value * exchangeRate);
const kinesisData = [0, 0, 0.01, 0.1, 0.5].map(value => value * exchangeRate);
const s3BucketData = [0.01, 0.05, 0.5, 5, 25.02].map(value => value * exchangeRate);
const sqsData = [0, 0, 0, 0, 2.34].map(value => value * exchangeRate);
const lambdaData = [0, 0, 0, 0, 23.85].map(value => value * exchangeRate);
const dataCatalogData = [0.01, 0.08, 0.86, 8.64, 43.2].map(value => value * exchangeRate);
const athenaData = [0.06, 0.58, 5.8, 29.71, 89.14].map(value => value * exchangeRate);
const apiGatewayData = [0, 0, 0, 0, 0].map(value => value * exchangeRate);

// Total por dispositivo
const totalData = iotCoreData.map((_, index) => 
    iotCoreData[index] + kinesisData[index] + s3BucketData[index] + sqsData[index] + lambdaData[index] + 
    dataCatalogData[index] + athenaData[index] + apiGatewayData[index]
);

const data = {
    labels: ['1 Dispositivo', '10 Dispositivos', '100 Dispositivos', '1000 Dispositivos', '5000 Dispositivos'],
    datasets: [
        {
            label: 'IoT Core',
            data: iotCoreData,
            fill: true,
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            tension: 0.1,
            pointBackgroundColor: 'rgba(255, 99, 132, 1)'
        },
        {
            label: 'Kinesis Firehose',
            data: kinesisData,
            fill: true,
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            tension: 0.1,
            pointBackgroundColor: 'rgba(54, 162, 235, 1)'
        },
        {
            label: 'S3 Bucket',
            data: s3BucketData,
            fill: true,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.1,
            pointBackgroundColor: 'rgba(75, 192, 192, 1)'
        },
        {
            label: 'SQS',
            data: sqsData,
            fill: true,
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            tension: 0.1,
            pointBackgroundColor: 'rgba(153, 102, 255, 1)'
        },
        {
            label: 'Lambda',
            data: lambdaData,
            fill: true,
            borderColor: 'rgba(255, 159, 64, 1)',
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            tension: 0.1,
            pointBackgroundColor: 'rgba(255, 159, 64, 1)'
        },
        {
            label: 'Data Catalog',
            data: dataCatalogData,
            fill: true,
            borderColor: 'rgba(255, 206, 86, 1)',
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            tension: 0.1,
            pointBackgroundColor: 'rgba(255, 206, 86, 1)'
        },
        {
            label: 'Athena',
            data: athenaData,
            fill: true,
            borderColor: 'rgba(201, 203, 207, 1)',
            backgroundColor: 'rgba(201, 203, 207, 0.2)',
            tension: 0.1,
            pointBackgroundColor: 'rgba(201, 203, 207, 1)'
        },
        {
            label: 'API Gateway',
            data: apiGatewayData,
            fill: true,
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            tension: 0.1,
            pointBackgroundColor: 'rgba(54, 162, 235, 1)'
        },
        {
            label: 'Total',
            data: totalData,
            fill: false,
            borderColor: 'rgba(0, 0, 0, 1)',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            borderDash: [5, 5],
            tension: 0.1,
            pointBackgroundColor: 'rgba(0, 0, 0, 1)'
        }
    ]
};

const config = {
    type: 'line',
    data: data,
    options: {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        return 'R$' + value;
                    }
                }
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        label += 'R$' + context.raw.toFixed(2);
                        return label;
                    }
                }
            }
        },
        interaction: {
            mode: 'index',
            intersect: false
        },
        stacked: true
    }
};

const iotCostLineChart = new Chart(ctx, config);
