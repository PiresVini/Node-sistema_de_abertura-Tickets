import { google } from 'googleapis';
import { getHourLog } from '../utils/utils.js';

console.log("script Sheets carregado !")

async function getGoogleSheetsClient() {
    const auth = new google.auth.GoogleAuth({
        keyFile: './credentials.json',
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const client = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: client });

    const spreadsheetId = "--- ID da planilha aqui ---";
    const sheetName = "Página1";

    const meta = await sheets.spreadsheets.get({ spreadsheetId });
    const sheetId = meta.data.sheets.find(
        (s) => s.properties.title === sheetName
    ).properties.sheetId;

    return { sheets, spreadsheetId, sheetName, sheetId };
}

export async function addLine(Title, TTK, BAR, MSG, DATELASTUPDATE, CITY, CITY_SIGLA, TAG, DATESTARTED ) {
    const { sheets, spreadsheetId, sheetName, sheetId } =
        await getGoogleSheetsClient();

    const colRes = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `${sheetName}!C:C`,
    });

    const linhas = colRes.data.values || [];
    const idx = linhas.findIndex((linha) => linha[0] === Title);
    if (idx === -1) {
        return;
    }

    const novaLinha = idx + 3;

    await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
            requests: [
                {
                    insertDimension: {
                        range: {
                            sheetId: sheetId,
                            dimension: "ROWS",
                            startIndex: novaLinha - 1,
                            endIndex: novaLinha,
                        },
                        inheritFromBefore: true,
                    },
                },
            ],
        },
    });

    const formulaCorrigida = BAR.replace(/H\d+/g, `H${novaLinha}`).replace(/G\d+/g, `G${novaLinha}`);

    const valores = [
        [
            TTK,
            formulaCorrigida,
            MSG,
            DATELASTUPDATE,
            CITY,
            CITY_SIGLA,
            TAG,
            DATESTARTED,
        ],
    ];

    await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${sheetName}!A${novaLinha}:H${novaLinha}`,
        valueInputOption: "USER_ENTERED",
        requestBody: { values: valores },
    });

    await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
            requests: [
                {
                    repeatCell: {
                        range: {
                            sheetId: sheetId,
                            startRowIndex: novaLinha - 1,
                            endRowIndex: novaLinha,
                            startColumnIndex: 0,
                            endColumnIndex: 8,
                        },
                        cell: {
                            userEnteredFormat: {
                                backgroundColor: { red: 1, green: 1, blue: 1 },
                            },
                        },
                        fields: "userEnteredFormat.backgroundColor",
                    },
                },
                {
                    repeatCell: {
                        range: {
                            sheetId: sheetId,
                            startRowIndex: novaLinha - 1,
                            endRowIndex: novaLinha,
                            startColumnIndex: 1,
                            endColumnIndex: 2,
                        },
                        cell: {
                            userEnteredFormat: {
                                horizontalAlignment: "LEFT",
                            },
                        },
                        fields: "userEnteredFormat.horizontalAlignment",
                    },
                },
            ],
        },
    });

    console.log(`Linha adicionada com sucesso! ${getHourLog()}`);
}