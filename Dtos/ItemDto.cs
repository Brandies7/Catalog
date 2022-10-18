using System;

namespace Catalog.Dtos
{
    public record ItemDto
    {
        public Guid Id { get; init; }
        public string Name { get; init; }
        public string Team { get; init; }
        public int PassCompletions { get; init; }
        public int PassAttempts { get; init; }
        public double PassingYards { get; init; }
        public int PassingTouchDowns { get; init; }
        public int Interceptions { get; set; }
        public double RushingYards { get; init; }
        public int RushingTouchDowns { get; init; }
        //public string Photo { get; init; }
        public string Image { get; init; }
    }
}