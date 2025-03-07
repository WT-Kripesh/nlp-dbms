#functions to retrieve relevant information about database
import re

#list of inbuilt system databases to ignore
system_databases = ['information_schema', 'mysql', 'performance_schema', 'sys']

#fetch all databases in local DBMS
def find_all_databases(cursor):
    cursor.execute("SHOW DATABASES")
    databases = cursor.fetchall()
    list_of_databases = [db[0] for db in databases if db[0] not in system_databases]
    return list_of_databases

def find_all_tables(database_name,cursor):
    cursor.execute(f"USE {database_name}")
    cursor.execute("SHOW TABLES")
    tables = cursor.fetchall()
    tables = [table[0] for table in tables]
    return tables

def find_all_columns(database_name, table_name,cursor):
    cursor.execute(f"USE {database_name}")
    cursor.execute(f"DESCRIBE {table_name}")
    columns = cursor.fetchall()
    columns = [column[0] for column in columns]
    return columns

def find_all_the_columns_with_datatype(database_name, table_name, cursor):
    cursor.execute(f"USE {database_name}")
    cursor.execute(f"DESCRIBE {table_name}")
    columns = cursor.fetchall()
    columns_with_datatype = []
    for column in columns:
        column = list(column)
        column[1] = re.sub(r'[^a-zA-Z]', '', column[1])
        columns_with_datatype.append({column[0] : column[1]})
    return columns_with_datatype

def fetch_total_information(list_of_databases, cursor):
    total_information_dict = {}
    for db in list_of_databases:
        table_columns_dict = {}
        all_tables_in_db = find_all_tables(db,cursor)
        for table in all_tables_in_db:
            table_columns_dict[table] = find_all_columns(db, table, cursor)
        total_information_dict[db] = table_columns_dict
    return total_information_dict

def find_total_information_of_selected_db(db, cursor):
    table_columns_dictionary = {}
    all_tables_in_db = find_all_tables(db,cursor)
    for table in all_tables_in_db:
        table_columns_dictionary[table] = find_all_columns(db, table, cursor)
    
    return table_columns_dictionary


def find_data_type_of_the_given_attribute(cursor, selected_db, from_clause, attribute):

    columns_with_datatype = find_all_the_columns_with_datatype(selected_db, from_clause, cursor)

    idx = None
    found = False

    for index, item in enumerate(columns_with_datatype):
        for key in item.keys():
            if key == attribute:
                idx = index
                found = True
                break  # Break the inner loop
        if found:
            break  # Break the outer loop
    
    return (list(columns_with_datatype[idx].values()))[0]
