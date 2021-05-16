export class QueryResponseDto {
  carroselImage: string;
  firstRepository: RepositoryDto;
  secondRepository: RepositoryDto;
  thirdRepository: RepositoryDto;
  fourthRepository: RepositoryDto;
  fifthRepository: RepositoryDto;
}

export class RepositoryDto {
  title: string;
  subtitle: string;
  url: string;
}
