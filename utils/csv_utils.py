import pandas as pd
import csv
import time
from django.shortcuts import HttpResponse


def read_csv(csv_file, rename_columns=None, delimiter=","):
    data_frame = pd.read_csv(csv_file, delimiter=delimiter)
    if rename_columns:
        data_frame.rename(columns=rename_columns, inplace=True)
    return data_frame, list(data_frame.columns)


def convert_to_csv_response(data, columns=None, rename_columns=None, file_name=None):
    file_name = "{}".format(int(time.time())) if not file_name else file_name
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="{filename}.csv"'.format(filename=file_name)
    writer = csv.writer(response)
    if rename_columns:
        df = pd.DataFrame(data, columns=rename_columns, dtype=str)
        df.rename(columns=rename_columns, inplace=True)
    else:
        df = pd.DataFrame(data, columns=columns if columns else [], dtype=str)
    df.fillna("", inplace=True)
    df.drop_duplicates(subset=columns, inplace=True, keep='first')
    df[columns] = df[columns].astype(str)
    writer.writerow([column for column in df.columns])
    writer.writerows(df.values.tolist())
    return response
