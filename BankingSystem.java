import java.io.*;
import java.util.*;

class Account {
    private static int idCounter = 1029; 
    private final int accountNumber;
    private final String accountHolder;
    private double balance;
    private final List<String>transactionHistory;

    public Account(String accountHolder, double initialDeposit) {
        this.accountNumber = idCounter++;
        this.accountHolder = accountHolder;
        this.balance = initialDeposit;
        this.transactionHistory = new ArrayList<>();
        transactionHistory.add("Account created with initial deposit: $" + initialDeposit);
    }

    public int getAccountNumber() {
        return accountNumber;
    }

    public String getAccountHolder() {
        return accountHolder;
    }

    public double getBalance() {
        return balance;
    }

    public void deposit(double amount) {
        balance += amount;
        transactionHistory.add("Deposited: $" + amount + " | Balance: $" + balance);
    }

    public boolean withdraw(double amount) {
        if (amount > balance) {
            transactionHistory.add("Withdrawal failed: Insufficient balance");
            return false;
        }
        balance -= amount;
        transactionHistory.add("Withdrew: $" + amount + " | Balance: $" + balance);
        return true;
    }

    public void displayTransactionHistory() {
        System.out.println("Transaction History for Account #" + accountNumber + ":");
        for (String transaction : transactionHistory) {
            System.out.println(transaction);
        }
    }

    public double calculateInterest(double annualRate, int years) {
        return balance * (annualRate / 100) * years;
    }

    public void saveToFile() {
        try (FileWriter writer = new FileWriter(accountNumber + "_account.txt")) {
            writer.write("Account Holder: " + accountHolder + "\n");
            writer.write("Account Number: " + accountNumber + "\n");
            writer.write("Current Balance: $" + balance + "\n");
            writer.write("Transaction History:\n");
            for (String transaction : transactionHistory) {
                writer.write(transaction + "\n");
            }
        } catch (IOException e) {
            System.out.println("Error saving account details: " + e.getMessage());
        }
    }
}

public class BankingSystem {
    private static final Map<Integer, Account> accounts = new HashMap<>();
    private static final Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) {
        while (true) {
            System.out.println("\n--- Banking System Menu ---");
            System.out.println("1. Create Account");
            System.out.println("2. Deposit Money");
            System.out.println("3. Withdraw Money");
            System.out.println("4. Check Balance");
            System.out.println("5. View Transaction History");
            System.out.println("6. Calculate Interest");
            System.out.println("7. Close Account");
            System.out.println("8. Exit");
            System.out.print("Choose an option: ");

            int choice = scanner.nextInt();
            switch (choice) {
                case 1 -> createAccount();
                case 2 -> depositMoney();
                case 3 -> withdrawMoney();
                case 4 -> checkBalance();
                case 5 -> viewTransactionHistory();
                case 6 -> calculateInterest();
                case 7 -> closeAccount();
                case 8 -> {
                    System.out.println("Thank you for using the Banking System. Goodbye!");
                    return;
                }
                default -> System.out.println("Invalid choice. Please try again.");
            }
        }
    }

    private static void createAccount() {
        System.out.print("Enter account holder's name: ");
        scanner.nextLine(); // Clear buffer
        String name = scanner.nextLine();
        System.out.print("Enter initial deposit: ");
        double initialDeposit = scanner.nextDouble();
        Account account = new Account(name, initialDeposit);
        accounts.put(account.getAccountNumber(), account);
        System.out.println("Account created successfully! Account Number: " + account.getAccountNumber());
    }

    private static void depositMoney() {
        Account account = findAccount();
        if (account == null) return;

        System.out.print("Enter deposit amount: ");
        double amount = scanner.nextDouble();
        account.deposit(amount);
        System.out.println("Deposited successfully! New Balance: $" + account.getBalance());
    }

    private static void withdrawMoney() {
        Account account = findAccount();
        if (account == null) return;

        System.out.print("Enter withdrawal amount: ");
        double amount = scanner.nextDouble();
        if (account.withdraw(amount)) {
            System.out.println("Withdrawal successful! New Balance: $" + account.getBalance());
        } else {
            System.out.println("Withdrawal failed: Insufficient balance.");
        }
    }

    private static void checkBalance() {
        Account account = findAccount();
        if (account == null) return;

        System.out.println("Current Balance: $" + account.getBalance());
    }

    private static void viewTransactionHistory() {
        Account account = findAccount();
        if (account == null) return;

        account.displayTransactionHistory();
    }

    private static void calculateInterest() {
        Account account = findAccount();
        if (account == null) return;

        System.out.print("Enter annual interest rate (%): ");
        double annualRate = scanner.nextDouble();
        System.out.print("Enter number of years: ");
        int years = scanner.nextInt();
        double interest = account.calculateInterest(annualRate, years);
        System.out.println("Interest for " + years + " years at " + annualRate + "%: $" + interest);
    }

    private static void closeAccount() {
        Account account = findAccount();
        if (account == null) return;

        account.saveToFile();
        accounts.remove(account.getAccountNumber());
        System.out.println("Account closed successfully. Details saved to file.");
    }

    private static Account findAccount() {
        System.out.print("Enter account number: ");
        int accountNumber = scanner.nextInt();
        Account account = accounts.get(accountNumber);
        if (account == null) {
            System.out.println("Account not found.");
        }
        return account;
    }
}
