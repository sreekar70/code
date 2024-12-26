import java.io.*;
import java.util.*;
import java.util.stream.Collectors;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import com.google.gson.*;

public class DataAnalysisTool {

    // Data Ingestion
    static class DataIngestion {
        public static List<Map<String, String>> loadCSV(String filePath) {
            List<Map<String, String>> data = new ArrayList<>();
            try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
                String line = br.readLine();
                String[] headers = line.split(",");

                while ((line = br.readLine()) != null) {
                    String[] values = line.split(",");
                    Map<String, String> row = new HashMap<>();
                    for (int i = 0; i < headers.length; i++) {
                        row.put(headers[i], values[i]);
                    }
                    data.add(row);
                }
                System.out.println("CSV data loaded successfully.");
            } catch (IOException e) {
                System.err.println("Error loading CSV: " + e.getMessage());
            }
            return data;
        }

        public static List<Map<String, String>> loadExcel(String filePath) {
            List<Map<String, String>> data = new ArrayList<>();
            try (FileInputStream fis = new FileInputStream(new File(filePath));
                 Workbook workbook = new XSSFWorkbook(fis)) {
                Sheet sheet = workbook.getSheetAt(0);
                Iterator<Row> rowIterator = sheet.iterator();
                Row headerRow = rowIterator.next();
                List<String> headers = new ArrayList<>();
                headerRow.forEach(cell -> headers.add(cell.getStringCellValue()));

                while (rowIterator.hasNext()) {
                    Row row = rowIterator.next();
                    Map<String, String> rowData = new HashMap<>();
                    for (int i = 0; i < headers.size(); i++) {
                        Cell cell = row.getCell(i);
                        String value = cell == null ? "" : cell.toString();
                        rowData.put(headers.get(i), value);
                    }
                    data.add(rowData);
                }
                System.out.println("Excel data loaded successfully.");
            } catch (IOException e) {
                System.err.println("Error loading Excel: " + e.getMessage());
            }
            return data;
        }

        public static List<Map<String, String>> loadJSON(String filePath) {
            List<Map<String, String>> data = new ArrayList<>();
            try (Reader reader = new FileReader(filePath)) {
                Gson gson = new Gson();
                data = gson.fromJson(reader, List.class);
                System.out.println("JSON data loaded successfully.");
            } catch (IOException e) {
                System.err.println("Error loading JSON: " + e.getMessage());
            }
            return data;
        }
    }

    // Data Cleaning
    static class DataCleaner {
        public static List<Map<String, String>> dropDuplicates(List<Map<String, String>> data) {
            List<Map<String, String>> uniqueData = data.stream()
                    .distinct()
                    .collect(Collectors.toList());
            System.out.println("Duplicates removed.");
            return uniqueData;
        }

        public static List<Map<String, String>> fillMissingValues(List<Map<String, String>> data, String defaultValue) {
            data.forEach(row -> row.replaceAll((k, v) -> v == null || v.isEmpty() ? defaultValue : v));
            System.out.println("Missing values filled.");
            return data;
        }
    }

    // Data Analysis
    static class DataAnalyzer {
        public static void describeData(List<Map<String, String>> data) {
            if (data.isEmpty()) return;

            Map<String, Integer> columnCounts = new HashMap<>();
            data.get(0).keySet().forEach(key -> columnCounts.put(key, 0));

            data.forEach(row -> row.forEach((key, value) -> {
                if (value != null && !value.isEmpty()) {
                    columnCounts.put(key, columnCounts.get(key) + 1);
                }
            }));

            System.out.println("Data Description:");
            columnCounts.forEach((key, count) ->
                    System.out.println(key + ": " + count + " non-null values"));
        }

        public static void valueCounts(List<Map<String, String>> data, String column) {
            Map<String, Long> counts = data.stream()
                    .map(row -> row.get(column))
                    .filter(Objects::nonNull)
                    .collect(Collectors.groupingBy(value -> value, Collectors.counting()));

            System.out.println("Value counts for column " + column + ":");
            counts.forEach((key, value) -> System.out.println(key + ": " + value));
        }
    }

    // Main Pipeline
    public static void main(String[] args) {
        String filePath = "your_file.csv"; // Update with your file path

        // Step 1: Load data
        List<Map<String, String>> data = DataIngestion.loadCSV(filePath);

        // Step 2: Clean data
        if (data != null) {
            data = DataCleaner.dropDuplicates(data);
            data = DataCleaner.fillMissingValues(data, "0");

            // Step 3: Analyze data
            DataAnalyzer.describeData(data);
            DataAnalyzer.valueCounts(data, "column_name"); // Replace with your column
        }
    }
}
