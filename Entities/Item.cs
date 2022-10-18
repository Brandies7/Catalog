using System;

namespace Catalog.Entities
{
    public record Item
    {
        public Guid Id { get; init; }
        public string Name { get; init; }
        public string Team { get; init; }
        public int PassCompletions { get; init; }
        public int PassAttempts { get; init; }
        public double PassingYards { get; init; }
        public int PassingTouchDowns { get; init; }
        public int Interceptions { get; init; }
        public double RushingYards { get; init; }
        public int RushingTouchDowns { get; init; }
        public byte[] Photo { get; init; }
        // public decimal Price { get; set; }
        // public DateTimeOffset CreatedDate { get; set; }
        public string Image { get; init; }
    }
}